package com.example.atmpc.atmpcapplication.implementation.Authenticcation.Admin;

import com.example.atmpc.atmpcapplication.GlobalExceptionHandler.ValidationException;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationReponseDto;
import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import com.example.atmpc.atmpcapplication.mapper.authentication.Admin.AdminMapper;
import com.example.atmpc.atmpcapplication.repository.AdminRepository;
import com.example.atmpc.atmpcapplication.service.TurnstileService;
import com.example.atmpc.atmpcapplication.service.authentication.Admin.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImplementation implements AdminService {

    private final AdminRepository repository;

    private final AdminMapper mapper;

    private final PasswordEncoder passwordEncoder;

    private final TurnstileService turnstileService;


    @Override
    public AdminRegistrationReponseDto adminCreating(

            AdminRegistrationRequestDto requestDto,

            HttpServletRequest request

    ){

      boolean isHuman = turnstileService.verifyToken(requestDto.getCaptchatoken());

      if(!isHuman){

          throw new ValidationException("Human verification failed, one verification per account creating, you must rerfresh the page");

      }
      String ipaddress = request.getRemoteAddr();

        Optional<AdminEntity> latestCreate = repository.findTopByIpaddressOrderByCreatedAtDesc(ipaddress);

        if(latestCreate.isPresent()){

            LocalDateTime lastCreate =  latestCreate.get().getCreatedAt();

            long minutes = ChronoUnit.MINUTES.between(

                    lastCreate,

                    LocalDateTime.now()

            );

            if(minutes < 60){

                long remaining = 60 - minutes;

                throw  new ValidationException(

                        "You can create another admin in "

                            + remaining +

                                "minute(s)"

                );

            }

        }

      if(!requestDto.getPassword().equals(requestDto.getConfirmpassword())){

          throw new ValidationException("Password and confirm password do not match");

      }
        AdminEntity entity = mapper.toEntity(requestDto);
        entity.setIpaddress(ipaddress);

        entity.setCreatedAt(LocalDateTime.now());

        entity.setPassword(passwordEncoder.encode(requestDto.getPassword()));

        entity.setApproval("Disapproved");

        AdminEntity saved = repository.save(entity);

        return mapper.toDto(saved);
    }



}
