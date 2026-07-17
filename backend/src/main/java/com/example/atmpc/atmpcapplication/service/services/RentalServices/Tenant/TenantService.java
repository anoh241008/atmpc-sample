package com.example.atmpc.atmpcapplication.service.services.RentalServices.Tenant;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantProfileRequestDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;


public interface TenantService {
    
    TenantResponseDto registerTenant(TenantRegistrationRequestDto requestDto);

    TenantResponseDto updateProfile(Long customerid, TenantProfileRequestDto requestDto, MultipartFile file);

    TenantResponseDto getTenantDetailsLogged(HttpServletRequest request);

}
