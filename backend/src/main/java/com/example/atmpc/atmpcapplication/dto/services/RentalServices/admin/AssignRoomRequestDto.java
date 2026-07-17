package com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignRoomRequestDto {

    @NotNull(message = "Room number is required")
    private  Integer roomid;

}
