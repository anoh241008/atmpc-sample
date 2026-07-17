package com.example.atmpc.atmpcapplication.dto.authentication.Admin.ResetPassword;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResetPasswordRequestDto {

    private String token;
    @NotBlank(message = "New password is required")
    @Size(max = 255, message = "New password must be less than 255 characters")
    private String newpassword;

    @NotBlank(message = "Confirm password is required")
    @Size(max = 255, message = "Confirm password must be less than 255 characters")
    private String confirmnewpassword;
}
