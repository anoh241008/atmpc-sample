package com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponseDto {

    private String roomid;

    private String roomnumber;

    private String capacity;

    private String monthlyrent;

    private String branch;

    private String status;

    //
    private List<String> occupants;

}

