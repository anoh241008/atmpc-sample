package com.example.atmpc.atmpcapplication.dto.authentication.Admin;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LoginRequestReponseDto {


    private String email;

    private  String role;

    private long userid;

    private String branch;

}
