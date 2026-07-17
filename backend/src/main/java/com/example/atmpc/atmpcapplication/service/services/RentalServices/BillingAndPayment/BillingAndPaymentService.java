package com.example.atmpc.atmpcapplication.service.services.RentalServices.BillingAndPayment;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;

public interface BillingAndPaymentService {

    void getDueDate(Long customerid);

    void runDailyBilling();

    Page<BillingAndPaymentResponseDto> getBillingPaymentsByCustomerid(int page, int size);

    BillingAndPaymentResponseDto processPaymentByAdmin(Long paymentid, BillingAndPaymentDto requestDto, HttpServletRequest request) ;

}
