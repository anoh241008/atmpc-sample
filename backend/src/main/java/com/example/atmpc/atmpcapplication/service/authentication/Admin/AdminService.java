package com.example.atmpc.atmpcapplication.service.authentication.Admin;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationReponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface AdminService {

    AdminRegistrationReponseDto adminCreating(AdminRegistrationRequestDto requestDto, HttpServletRequest request);
}
