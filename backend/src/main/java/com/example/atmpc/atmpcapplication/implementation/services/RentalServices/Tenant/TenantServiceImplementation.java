package com.example.atmpc.atmpcapplication.implementation.services.RentalServices.Tenant;


import com.example.atmpc.atmpcapplication.GlobalExceptionHandler.ValidationException;
import com.example.atmpc.atmpcapplication.config.JwtUtil;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantProfileRequestDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import com.example.atmpc.atmpcapplication.filehandler.filestorage;
import com.example.atmpc.atmpcapplication.mapper.services.RentalServices.Tenant.TenantMapper;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.Tenant.TenantRepository;
import com.example.atmpc.atmpcapplication.service.TurnstileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Tenant.TenantService;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class TenantServiceImplementation implements TenantService {

    private final TenantRepository repository;

    private final TenantMapper mapper;

    private final PasswordEncoder passwordEncoder;

    private final TurnstileService turnstileService;

    private final filestorage filestorage;

    private final JwtUtil jwtUtil;

    @Value("${upload.photo.dir}")
    private String uploadPhotoDir;

    @Override
    public TenantResponseDto registerTenant(
            TenantRegistrationRequestDto requestDto
    ){

        boolean isHuman = turnstileService.verifyToken(requestDto.getCaptchatoken());

        if(!isHuman){

            throw new ValidationException("Human verification failed, one verification per account creating, you must refresh the page");

        }

        CustomerDetailsEntity entity = mapper.registerTenant(requestDto);

        entity.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        CustomerDetailsEntity saved = repository.save(entity);

        return mapper.tenantDetailsResponse(saved);
    }

    @Override
    public TenantResponseDto updateProfile(
            Long customerid,
            TenantProfileRequestDto requestDto,
            MultipartFile file
    ){

        CustomerDetailsEntity existing = repository.findByCustomerid(customerid)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        mapper.updateProfile(requestDto, existing);

        if(file != null && !file.isEmpty()){

            filestorage.deleteFile(existing.getProfilephoto());

            String newFileName = filestorage.upload(file);

            existing.setProfilephoto(newFileName);

        }

        CustomerDetailsEntity update = repository.save(existing);

        return mapper.tenantDetailsResponse(update);

    }

    @Override
    public TenantResponseDto getTenantDetailsLogged(HttpServletRequest request){

        Long customerid = jwtUtil.getUserIdFromRequest(request);

        CustomerDetailsEntity details = repository.findByCustomerid(customerid)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        return mapper.tenantDetailsResponse(details);

    }


}
