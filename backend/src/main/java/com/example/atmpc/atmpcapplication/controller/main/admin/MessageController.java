package com.example.atmpc.atmpcapplication.controller.main.admin;


import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.main.admin.MessageRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.MessageResponseDto;
import com.example.atmpc.atmpcapplication.service.main.admin.MessageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService service;

    @PostMapping("/createMessage")
    public ResponseEntity<ApiResponse<MessageResponseDto>> createMessage(
            @Valid @RequestBody MessageRequestDto requestDto,
            HttpServletRequest request
            )
    {

        MessageResponseDto response = service.createMessage(requestDto, request);

        return ResponseEntity.ok(new ApiResponse<>("Your message inquiry sent successfully", response));

    }

    @GetMapping("/getMessages")
    public ResponseEntity<ApiResponse<Page<MessageResponseDto>>> getAllMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<MessageResponseDto> response = service.getAllMessages(page, size); // Example pagination values

        return ResponseEntity.ok(new ApiResponse<>("Messages fetched successfully", response));

    }

    @DeleteMapping("/delete/{messageid}")
    public ResponseEntity<ApiResponse<String>> deleteMessage(
            @PathVariable Long messageid
    ){

        service.deleteMessage(messageid);

        return ResponseEntity.ok(
                new ApiResponse<>("Message deleted successfully", null)
        );
    }

}
