package com.example.atmpc.atmpcapplication.dto.authentication.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegistrationReponseDto {
    private String email;
    private String admin_type;
    private String branch;
    private String approval;

}
