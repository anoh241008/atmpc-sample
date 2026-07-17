package com.example.atmpc.atmpcapplication.service.authentication.Admin;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.ForgotPassword.ForgotPasswordRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.ResetPassword.ResetPasswordRequestDto;


public interface AuthService {

    LoginRequestReponseDto loginAdmin(LoginRequestDto requestDto);

    void  forgotPassword(ForgotPasswordRequestDto requestDto);

    void resetPassword(ResetPasswordRequestDto requestDto);

    void validateResetToken(String token);
}

