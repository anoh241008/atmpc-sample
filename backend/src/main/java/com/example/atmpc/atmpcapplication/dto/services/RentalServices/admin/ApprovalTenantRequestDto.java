package com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalTenantRequestDto {

    private String approval;
    private String status;
}
