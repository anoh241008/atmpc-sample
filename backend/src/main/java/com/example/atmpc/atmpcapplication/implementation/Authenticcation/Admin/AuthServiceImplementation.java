package com.example.atmpc.atmpcapplication.implementation.Authenticcation.Admin;

import com.example.atmpc.atmpcapplication.GlobalExceptionHandler.ValidationException;
import com.example.atmpc.atmpcapplication.config.JwtUtil;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.ForgotPassword.ForgotPasswordRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.ResetPassword.ResetPasswordRequestDto;
import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import com.example.atmpc.atmpcapplication.mapper.authentication.Admin.AuthServiceMapper;

import com.example.atmpc.atmpcapplication.repository.AdminRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.Tenant.TenantRepository;
import com.example.atmpc.atmpcapplication.service.TurnstileService;
import com.example.atmpc.atmpcapplication.service.authentication.Admin.AuthService;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImplementation implements AuthService {

    private final AdminRepository adminRepository;

    private final TenantRepository tenantRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    private final AuthServiceMapper mapper;

    private final TurnstileService turnstileService;

    private final JavaMailSenderImpl mailSender;

    private final AuthenticationManager authenticationManager;


    private static final String RESET_BASE_URL_ALL_ADMIN = "http://localhost:5173/reset-password?token=";

    private static final String RESET_BASE_URL_TENANT_ADMIN = "http://localhost:5173/services/RentalServices/reset-password?token=";

    @Override
    public LoginRequestReponseDto loginAdmin(LoginRequestDto requestDto){

        boolean isHuman = turnstileService.verifyToken(requestDto.getCaptchatoken());

        if(!isHuman){

            throw new ValidationException("Human verification failed, one verification per account logging in, you must rerfresh the page");

        }

        Optional<AdminEntity> admin = adminRepository.findByEmail(requestDto.getEmail());

        if(admin.isPresent()){

            AdminEntity a = admin.get();

            jwtUtil.buildToken(a.getUserid(), a.getEmail(), a.getAdmin_type(), a.getBranch());

            if(!passwordEncoder.matches(requestDto.getPassword(), a.getPassword())){

                throw new ValidationException("Invalid password");

            } else {

                if(!a.getApproval().equals("Approved")){

                    throw new ValidationException("Your account is not yet approved by super admin");

                }

            }

            String role = a.getAdmin_type();

            return mapper.loginAdmin(a.getUserid(),a.getEmail(), role, a.getBranch());

        }

        Optional<CustomerDetailsEntity> tenant = tenantRepository.findByEmail(requestDto.getEmail());

        if(tenant.isPresent()){

            CustomerDetailsEntity t = tenant.get();

            jwtUtil.buildToken(t.getCustomerid(),t.getEmail(), t.getUser_type(), t.getBranch());

            if(!passwordEncoder.matches(requestDto.getPassword(), t.getPassword())){

                throw new ValidationException("Invalid password");

            } else {

                if(!t.getApproval().equals("Approved")){

                    throw new ValidationException("Your account is not yet approved by super admin");

                }

            }
            String role = t.getUser_type();

            return mapper.loginAdmin(t.getCustomerid() ,t.getEmail(), role, t.getBranch());

        }

        throw  new ValidationException("Invalid email");

    }


    @Override
    public void  forgotPassword(ForgotPasswordRequestDto requestDto){

        String email = requestDto.getEmail();

        Optional<CustomerDetailsEntity> tenant = tenantRepository.findByEmail(email);

        if(tenant.isPresent()) {

            CustomerDetailsEntity t = tenant.get();

            String token = jwtUtil.generate_RESET_PASSWORD_TOKEN( t.getCustomerid().longValue(), "TENANT_ADMIN");

            String resetLink = RESET_BASE_URL_TENANT_ADMIN + token;

            sendResetLink(email, resetLink);

            log.info("Reset password email sent to tenant id: {}", t.getCustomerid());

            return;
        }

        Optional<AdminEntity> admin = adminRepository.findByEmail(email);

        if(admin.isPresent()){

            AdminEntity a = admin.get();

            String token = jwtUtil.generate_RESET_PASSWORD_TOKEN(a.getUserid().longValue(), "ALL_ADMIN");

            String resetLink = RESET_BASE_URL_ALL_ADMIN + token;

            sendResetLink(email, resetLink);

            log.info("Reset password email sent to admin id: {}", a.getUserid());

            return;

        }

        throw new ValidationException("Invalid email");

    }


    private void sendResetLink(String email, String link){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject("Reset password request");

        message.setText(
                "Hello,\n\n" +
                        "You requested to reset your password.\n\n" +
                        "Click the link below to reset it (valid for 15 minutes):\n\n" +
                        link + "\n\n" +
                        "If you did not request this, please ignore this email.\n\n" +
                        "— ATMPC Application"

        );

        mailSender.send(message);
    }

    @Override
    public  void resetPassword(ResetPasswordRequestDto requestDto){

        if(!requestDto.getNewpassword().equals(requestDto.getConfirmnewpassword())){

            throw new ValidationException("Password and confirm password do not match");

        }

        Claims claims = jwtUtil.parseClaims(requestDto.getToken());

        Long id = Long.parseLong(claims.getSubject());

        String usertype = claims.get("usertype", String.class);

        String encodedPassword = passwordEncoder.encode(requestDto.getNewpassword());

        if("TENANT_ADMIN".equals(usertype)){

            CustomerDetailsEntity tenant = tenantRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Tenant not found"));

            tenant.setPassword(encodedPassword);

            tenantRepository.save(tenant);

            log.info("Password reset for tenant id: {}", id);

        } else if("ALL_ADMIN".equals(usertype)){

            AdminEntity admin = adminRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("ADMIN not found"));

            admin.setPassword(encodedPassword);

            adminRepository.save(admin);

            log.info("Password reset for admin id: {}", id);

        }else{

            throw new ValidationException("Invalid session — unknown user type");

        }

    }


    @Override
    public void validateResetToken(String token) {

        if (!jwtUtil.validateResetToken(token)) {

            throw new ValidationException("Invalid or expired session");

        }

    }
}
