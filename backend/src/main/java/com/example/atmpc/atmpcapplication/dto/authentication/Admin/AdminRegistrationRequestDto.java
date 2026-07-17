package com.example.atmpc.atmpcapplication.dto.authentication.Admin;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminRegistrationRequestDto {

    @NotBlank(message="Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email must be less than 255 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max = 255, message = "Password must be less than 255 characters")
    private String password;

    @NotBlank(message = "Confirm password is required")
    @Size(max = 255, message = "Confirm password must be less than 255 characters")
    private String confirmpassword;

    @NotBlank(message = "Admin type is required")
    @Pattern(regexp = "^(MAIN_ADMIN|RENTAL_ADMIN|IT_SOLUTION_ADMIN|IT_TRAINING_ADMIN)$",
            message = "Type must be MAIN_ADMIN, RENTAL_ADMIN, IT_SOLUTION_ADMIN or IT_TRAINING_ADMIN")
    private String admin_type;

    @NotBlank(message = "Branch type is required")
    @Pattern(regexp = "^(Not_Applicable|CDO_Branch|BANGON-MARAWI_Branch|MSU-MARAWI_Branch)$",
            message = "Type must be Not_Applicable, CDO_Branch or MARAWI_Branch or MSU_MARAWI_Branch")
    private String branch;

    private String approval;

    private String ipaddress;

    private  String createdAt;

    private String captchatoken;
}
