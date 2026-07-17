package com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantProfileRequestDto {



    @NotBlank(message = "Full name is required")
    @Size(max = 255, message = "Fullname must be less than 255 characters")
    private String fullname;

    @NotBlank(message = "Gender is required")
    @Size(max = 255, message = "Gender must be less than 255 characters")
    private String gender;

    @NotBlank(message = "Birthdate is required")
    @Size(max = 255, message = "Birthdate must be less than 255 characters")
    private String birthdate;

    @NotBlank(message = "Phone number is required")
    @Size(max = 255, message = "Phone number must be less than 255 characters")
    private String phonenumber;

    @NotBlank(message = "Occupation is required")
    @Size(max = 255, message = "Occupation must be less than 255 characters")
    private String occupation;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Address is required")
    @Size(max = 255 , message = "Address must be less than 255 characters")
    private String address;

    @NotBlank(message = "Contact name is required")
    @Size(max = 255, message = "Contact name must be less than 255 characters")
    private String contactname;

    @NotBlank(message = "Contact number is required")
    @Size(max = 255, message = "Contact number must be less than 255 characters")
    private String contactnumber;

    @NotBlank(message = "Relationship contact is required")
    @Size(max = 255, message = "Relationship contact must be less than 255 characters")
    @Pattern(regexp = "^(Parent|Sibling|Friend)$",
    message = "Relationship contact must be Parent, Sibling, Friend ")
    private String relationshipcontact;

}
