package com.example.atmpc.atmpcapplication.dto.authentication.Admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Username must be less than 255 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max = 255, message = "Password must be less than 255 characters")
    private String password;

    private String captchatoken;
}
