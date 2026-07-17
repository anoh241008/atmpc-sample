package com.example.atmpc.atmpcapplication.entity.services.RentalServices;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_rental_rentpayment")
public class RentPaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentid;

    private Long customerid;

    private Integer roomid;

    private String fullname;

    private String electricbill;

    private String month_topay;

    private String amount;

    private String status;

    private LocalDate date_created;
}
