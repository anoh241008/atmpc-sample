package com.example.atmpc.atmpcapplication.dto.main.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {


    private Long messageid;
    private String fullname;
    private String email;
    private String subjecttype;
    private String messagedesc;
}
