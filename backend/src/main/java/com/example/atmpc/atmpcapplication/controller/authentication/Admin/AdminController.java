package com.example.atmpc.atmpcapplication.controller.authentication.Admin;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationReponseDto;
import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.service.authentication.Admin.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/adminAccountRegistration")
public class AdminController {

    private final AdminService service;



    @PostMapping("/adminCreate")
    public ResponseEntity<ApiResponse<AdminRegistrationReponseDto>> adminCreating(

            @Valid @RequestBody AdminRegistrationRequestDto requestDto, HttpServletRequest request

    ){
        AdminRegistrationReponseDto responseDto = service.adminCreating(requestDto, request);

       return ResponseEntity.ok(new ApiResponse<>("You are successfully registered, wait for the super admin for approval", responseDto));

    }
}
