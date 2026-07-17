package com.example.atmpc.atmpcapplication.dto.main.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentRequestDto {
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be less than 255 characters")
    private String title;

    @NotBlank(message = "Type is required")
    @Pattern(regexp = "^(News|Event|Announcement|Update)$",
            message = "Type must be News, Event, Announcement or Update")
    private String type;
    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must be less than 2000 characters")
    private String description;

}
