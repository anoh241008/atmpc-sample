package com.example.atmpc.atmpcapplication.dto.main.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentResponseDto {

    private Long contentid;
    private String contentphoto;
    private String type;
    private String title;
    private String description;

}
