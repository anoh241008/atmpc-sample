package com.example.atmpc.atmpcapplication.dto.main.admin;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequestDto {

    @NotBlank(message = "Full name is required")
    @Size(max = 255, message = "Full name must be less than 255 characters")
    private String fullname;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Subject type is required")
    @Pattern(regexp = "^(General Inquiry|Collaboration Partnership|Other)$",
             message = "Subject type must be General Inquiry, Collaboration Partnership, or Other")
    private String subjecttype;

    @NotBlank(message = "Message is required" )
    @Size(max = 1000, message = "Message must be less than 1000 characters")
    private String messagedesc;

    private String ipaddress;

    private LocalDateTime createdAt;

    private String captchatoken;

}
