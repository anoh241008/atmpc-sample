package com.example.atmpc.atmpcapplication.controller.services.RentalServices.BillingAndPayment;

import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentResponseDto;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.BillingAndPayment.BillingAndPaymentRepository;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.BillingAndPayment.BillingAndPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billingpayment")
@RequiredArgsConstructor
public class BillingAndPaymentController {

    private final BillingAndPaymentService service;

    private final BillingAndPaymentRepository repository;


    @GetMapping("/paymentList")
    public ResponseEntity<ApiResponse<Page<BillingAndPaymentResponseDto>>> getBillingPaymentsByCustomerid(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){

        Page<BillingAndPaymentResponseDto> responseDtos = service.getBillingPaymentsByCustomerid(page,size);

        return  ResponseEntity.ok(
                new ApiResponse<>("Payment List Retrieved Successfully", responseDtos)
        );

    }

    @PutMapping("/MarkPaidUnpaid/{paymentid}")
    public ResponseEntity<ApiResponse<BillingAndPaymentResponseDto>> toPayTheBills(

            @PathVariable("paymentid") Long paymentid,
            @RequestBody (required = false) BillingAndPaymentDto requestDto,
            HttpServletRequest request

    ){

        BillingAndPaymentResponseDto responseDto = service.processPaymentByAdmin(paymentid, requestDto, request);

        return ResponseEntity.ok(

                new ApiResponse<>("Payment marked successfully", responseDto)
        );

    }

}
