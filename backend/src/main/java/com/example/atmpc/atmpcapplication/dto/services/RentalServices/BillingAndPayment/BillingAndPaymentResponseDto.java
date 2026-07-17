package com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingAndPaymentResponseDto {

    private Long paymentid;

    private Long customerid;

    private Integer roomid;

    private String roomnumber;

    private String fullname;

    private String electricbill;

    private String month_topay;

    private String amount;

    private String status;

    private LocalDate date_created;

}
