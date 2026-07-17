package com.example.atmpc.atmpcapplication.implementation.services.RentalServices.BillingAndPayment;

import com.example.atmpc.atmpcapplication.GlobalExceptionHandler.ValidationException;
import com.example.atmpc.atmpcapplication.config.JwtUtil;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentResponseDto;
import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RentPaymentEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RoomEntity;
import com.example.atmpc.atmpcapplication.mapper.services.RentalServices.BillingAndPaymentMapper.BillingAndPaymentMapper;
import com.example.atmpc.atmpcapplication.repository.AdminRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.BillingAndPayment.BillingAndPaymentRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.Tenant.TenantRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.admin.RoomManagementRepository;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.BillingAndPayment.BillingAndPaymentService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class BillingAndPaymentServiceImplementation implements BillingAndPaymentService {


    private final BillingAndPaymentRepository billingAndPaymentRepository;

    private final TenantRepository tenantRepository;

    private final RoomManagementRepository roomManagementRepository;

    private final BillingAndPaymentMapper billingAndPaymentMapper;

    private final AdminRepository adminRepository;

    private final HttpServletRequest request;

    private final JwtUtil jwtUtil;


    @Override
    @Transactional
    public void getDueDate(Long customerid) {

        CustomerDetailsEntity customer = tenantRepository
                .findGetDueDate(customerid)
                .orElseThrow(() -> new RuntimeException(
                        "Customer not found with id: " + customerid));

        LocalDate dueDate = customer.getDateDue();

        if(dueDate == null){

            log.warn("Customer {} has no due date set, skipping billing", customerid);
            return;

        }

        if(!isDueToday(dueDate)){

            log.debug("Customer {} not due today (dueDate={})", customerid, dueDate);

            return;

        }

        YearMonth current = YearMonth.now();

        YearMonth next = current.plusMonths(1);

        String billingPeriod = current.getMonth().toString() + "-" + current.getYear() +
                "-" +
                next.getMonth().toString() + "-" + next.getYear();

        boolean isSharedBranch = customer.getBranch().equals("CDO_Branch");

        if(isSharedBranch){

            // ROOM-LEVEL BILLING: one bill per room, shared by all occupants
            if(billingAndPaymentRepository.existsByRoomidAndMonth_topay(customer.getRoomid(), billingPeriod)){

                log.info("Room {} already billed for {}", customer.getRoomid(), billingPeriod);
                return;
            }

            RoomEntity roomAmount = roomManagementRepository.findMonthlyRentByRoomId(customer.getRoomid())
                    .orElseThrow(() ->
                            new RuntimeException("No amount found for room id: " + customer.getRoomid()));

            RentPaymentEntity billing = new RentPaymentEntity();

            billing.setCustomerid(null);

            billing.setRoomid(customer.getRoomid());

            billing.setFullname(null);

            billing.setMonth_topay(billingPeriod);

            billing.setAmount(roomAmount.getMonthlyrent());

            billing.setStatus("UNPAID");

            try {
                billingAndPaymentRepository.save(billing);

                log.info("Room billing created for room id {} (amount {})",
                        customer.getRoomid(), roomAmount.getMonthlyrent());

            } catch (DataIntegrityViolationException e) {

                log.warn("Duplicate room billing prevented by DB constraint for room {}", customer.getRoomid());

            }

            return;
        }

        // PER-TENANT BILLING: each tenant billed individually
        if (billingAndPaymentRepository
                .existsByCustomeridAndMonth_topay(customerid, billingPeriod)) {

            log.info("Customer {} already billed for {}", customerid, billingPeriod);
            return;
        }

        RoomEntity roomAmount = roomManagementRepository.findMonthlyRentByRoomId(customer.getRoomid())
                .orElseThrow(() ->
                        new RuntimeException("No amount found for room id: " + customer.getRoomid()));

        RentPaymentEntity billing = new RentPaymentEntity();

        billing.setCustomerid(customer.getCustomerid());

        billing.setRoomid(customer.getRoomid());

        billing.setFullname(customer.getFullname());

        billing.setMonth_topay(billingPeriod);

        billing.setAmount(roomAmount.getMonthlyrent());

        billing.setStatus("UNPAID");


        try {
            billingAndPaymentRepository.save(billing);

            log.info("Billing created for customer {} (room {}, amount {})",
                    customerid, customer.getRoomid(), roomAmount.getMonthlyrent());

        } catch (DataIntegrityViolationException e) {

            log.warn("Duplicate billing prevented by DB constraint for customer {}", customerid);

        }

    }

    @Override
    public void runDailyBilling(){

        List<Long> dueCustomerIds = tenantRepository.findCustomerIdsDueToday();

        log.info("Daily billing run started: {} customer(s) due today", dueCustomerIds.size());

        int failed = 0;

        for(Long customerid : dueCustomerIds){

            try{

                getDueDate(customerid);

            } catch (Exception e) {

                failed++;

                log.error("Billing failed for customerid={}: {}", customerid, e.getMessage(), e);

            }

        }
        log.info("Daily billing run finished: attempted={}, failed={}", dueCustomerIds.size(), failed);
    }

    private boolean isDueToday(LocalDate dueDate){

        LocalDate toDay = LocalDate.now();

        int dueDay = dueDate.getDayOfMonth();

        int lastDayOfMonth  = toDay.lengthOfMonth();

        if(dueDay == toDay.getDayOfMonth()) return true;

        return dueDay > lastDayOfMonth && toDay.getDayOfMonth() == lastDayOfMonth;

    }

    @Override
    public Page<BillingAndPaymentResponseDto> getBillingPaymentsByCustomerid(int page, int size){

        Long customerid = getCurrentUserId();

        Pageable pageable = PageRequest.of(page, size);

        boolean isAdmin = adminRepository.findByUserid(customerid) != null;

        return billingAndPaymentRepository.findPaymentInSameBranch(customerid, isAdmin, pageable)
                .map(billingAndPaymentMapper::toPaymentList);

    }

    private Long getCurrentUserId(){

        return jwtUtil.getUserIdFromRequest(request);

    }

    @Override
    @Transactional
    public BillingAndPaymentResponseDto processPaymentByAdmin(
            Long paymentId,
            BillingAndPaymentDto requestDto,
            HttpServletRequest request) {

        Long userId = jwtUtil.getUserIdFromRequest(request);

        AdminEntity admin = adminRepository.findByUserid(userId);

        if (admin == null) {

            throw new EntityNotFoundException("Admin not found for userId: " + userId);

        }

        RentPaymentEntity bill = billingAndPaymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found: " + paymentId));

        boolean isCdoBranch = "CDO_Branch".equals(admin.getBranch());

        boolean electricBillProvided = requestDto.getElectricbill() != null && !requestDto.getElectricbill().isBlank();

        // 1. New/changed electric bill submitted -> update billing fields
        if (electricBillProvided && !Objects.equals(requestDto.getElectricbill(), bill.getElectricbill())) {

            billingAndPaymentMapper.toSingleRoomBilling(requestDto, bill);

            RentPaymentEntity updated = billingAndPaymentRepository.save(bill);

            return billingAndPaymentMapper.toPaymentResponse(updated);

        }

        // 2. Mark as paid/unpaid -- CDO branch requires an electric bill on file first
        if (isCdoBranch && (bill.getElectricbill() == null || bill.getElectricbill().isBlank())) {

            throw new ValidationException(
                    "Electric bill amount must be entered before marking as paid");

        }

        billingAndPaymentMapper.toPayment(bill); // assumed to mutate `bill` in place

        RentPaymentEntity saved = billingAndPaymentRepository.save(bill);

        return billingAndPaymentMapper.toPaymentResponse(saved);
    }


}