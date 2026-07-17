package com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetDueTenantRequestDto {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Due date is required")
    private LocalDate dateDue;

}
