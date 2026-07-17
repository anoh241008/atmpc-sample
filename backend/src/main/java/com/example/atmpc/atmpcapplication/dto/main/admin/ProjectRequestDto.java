package com.example.atmpc.atmpcapplication.dto.main.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectRequestDto {
    @NotBlank(message="Project name is required")
    @Size(max = 255, message = "Only 1 to 255 characters are allowed")
    private String projectname;

    @NotBlank(message="Project type is required")
    @Pattern(regexp = "^(Energy|Tech|Agriculture|Construction)$",
                message = "Type must be Energy, Tech, Agriculture, Build")
    private String type;

    @NotBlank(message="Project status is required")
    @Pattern(regexp = "^(Active|In Progress|Completed)$",
                message = "Status must be Active, In Progress, Completed")
    private String status;

    @NotBlank(message="Project budget is required")
    @Pattern(
            regexp = "^(\\d{1,3}(,\\d{3})+)(\\.\\d{2})$",
            message = "Budget must be in format 1,000.00"
    )
    private String budget;

    @NotBlank(message="Project description is required")
    @Size(max = 2000, message = "Only 1 to 2000 characters are allowed")
    private String description;

    @NotBlank(message="Project progress is required")
    private String progress;
}

