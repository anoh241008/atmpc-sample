package com.example.atmpc.atmpcapplication.controller.main.admin;

import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectResponseDto;
import com.example.atmpc.atmpcapplication.service.main.admin.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;


    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ProjectResponseDto>> createProject(
           @Valid @ModelAttribute ProjectRequestDto requestDto,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {

        ProjectResponseDto response = service.createProject(requestDto, file);

        return ResponseEntity.ok(new ApiResponse<>("Project created successfully", response));

    }
    @PutMapping(value = "/update/{projectid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ProjectResponseDto>> updateProject(
            @PathVariable("projectid") Long projectid,
            @RequestPart @Valid @ModelAttribute ProjectRequestDto requestDto,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {

        ProjectResponseDto response = service.updateProject(projectid,requestDto,file);

        return ResponseEntity.ok(new ApiResponse<>("Project updated successfully", response));

    }

    @DeleteMapping("/delete/{projectid}")
    public ResponseEntity<ApiResponse<String>> deleteProject(
            @PathVariable Long projectid
    ){

        service.deleteProject(projectid);

        return ResponseEntity.ok(
                new ApiResponse<>("Project deleted successfuly", null)
        );

    }

    @GetMapping("/getAllProject")
    public ResponseEntity<ApiResponse<Page<ProjectResponseDto>>> getAllProject(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){

        Page<ProjectResponseDto> responseDto = service.getAllProject(page,size);

        return ResponseEntity.ok(
                new ApiResponse<>("Project fetched successfully", responseDto)
        );

    }

    @GetMapping ("/getFeatureProjects")
    public ResponseEntity<ApiResponse<Page<ProjectResponseDto>>> getFeatureProject(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ){

        Page<ProjectResponseDto> responseDto = service.getFeatureProject(page,size);

        return ResponseEntity.ok(
                new ApiResponse<>("Feature Project fetched successfully", responseDto)
        );

    }



}
