package com.example.atmpc.atmpcapplication.controller.main.admin;
import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.main.admin.ContentRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ContentResponseDto;
import com.example.atmpc.atmpcapplication.service.main.admin.ContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService service;


    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ContentResponseDto>> createContent(
            @Valid @ModelAttribute ContentRequestDto requestDto,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {

        ContentResponseDto response = service.createContent(requestDto, file);

        return ResponseEntity.ok(new ApiResponse<>("Content created successfully", response));

    }


    @PutMapping(value = "/update/{contentid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ContentResponseDto>> updateContent(
            @PathVariable("contentid") Long contentid,
            @RequestPart @Valid @ModelAttribute ContentRequestDto requestDto,
            @RequestPart(value = "file",required = false) MultipartFile file
    ){

        ContentResponseDto response = service.updateContent(contentid,requestDto,file);

        return ResponseEntity.ok(new ApiResponse<>("Content updated successfully", response));

    }

    @DeleteMapping("/delete/{contentid}")
    public ResponseEntity<ApiResponse<String>> deleteContent(
            @PathVariable Long contentid
    ){

        service.deleteContent(contentid);

        return ResponseEntity.ok(
                new ApiResponse<>("Content deleted successfully", null)
        );

    }

    @GetMapping("/getAllContents")
    public ResponseEntity<ApiResponse<Page<ContentResponseDto>>> getAllContents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
            ){

            Page<ContentResponseDto> response = service.getAllContents(page, size);

            return ResponseEntity.ok(
                    new ApiResponse<>("Contents fetched successfully", response)
            );

    }

    @GetMapping("/getLatestUpdate")
    public ResponseEntity<ApiResponse<Page<ContentResponseDto>>> getLatestUpdate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ){

        Page<ContentResponseDto> response = service.getLatestUpdate(page, size);

        return ResponseEntity.ok(
                new ApiResponse<>("Latest update fetched successfully", response)
        );

    }

    @GetMapping("/getAnnouncementUpdate")
    public ResponseEntity<ApiResponse<Page<ContentResponseDto>>> getAnnouncementUpdate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam List<String> types
    ){

        Page<ContentResponseDto> response =
                service.getAnnouncementUpdate(page, size, types);

        return ResponseEntity.ok(
                new ApiResponse<>("Content fetched successfully", response)
        );

    }

    @GetMapping("/getNewsEvent")
    public ResponseEntity<ApiResponse<Page<ContentResponseDto>>> getNewsEvent(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam List<String> types
    ){

        Page<ContentResponseDto> response = service.getNewsEvent(page, size, types);

        return ResponseEntity.ok(
                new ApiResponse<>("Content fetched successfully", response)
        );

    }



}
