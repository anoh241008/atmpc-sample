package com.example.atmpc.atmpcapplication.dto.services.RentalServices;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantResponseDto {


    private Long customerid;
    private Integer roomid;
    private String email;
    private String approval;
    private String status;
    private String branch;
    private String fullname;
    private String gender;
    private String birthdate;
    private String phonenumber;
    private String occupation;
    private String address;
    private String contactname;
    private String contactnumber;
    private String relationshipcontact;
    private String profilephoto;
    private LocalDate dateDue;
    private String user_type;


    // room fields to display the assigned room
    private String    roomnumber;



}
