package com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment;

import java.time.LocalDate;

public interface RentPaymentWithRoomProjection {

    Long getPaymentid();
    Long getCustomerid();
    Integer getRoomid();
    String getRoomnumber();
    String getFullname();
    String getElectricbill();
    String getMonth_topay();
    String getAmount();
    String getStatus();
    LocalDate getDate_created();
}
