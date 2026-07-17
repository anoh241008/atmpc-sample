package com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestDto {

    @NotNull(message = "Room Number is required")
    @Size(min = 1, max = 200, message = "Only 1 to 200 characters are allowed")
    private String roomnumber;

    @NotNull(message = "Capacity is required")
    @Size(min = 1, max = 200, message = "Only 1 to 200 characters are allowed")
    private String capacity;

    @NotNull(message = "Monthly Rent is required")
    @Size(min = 1, max = 200, message = "Only 1 to 200 characters are allowed")
    private String monthlyrent;


    private String branch;

}
