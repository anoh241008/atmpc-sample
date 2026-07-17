package com.example.atmpc.atmpcapplication.dto.main.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProjectResponseDto {
    private Long projectid;
    private String projectname;
    private String projectphoto;
    private String type;
    private String status;
    private String budget;
    private String description;
    private String progress;
}
