package com.example.atmpc.atmpcapplication.service.main.admin;

import com.example.atmpc.atmpcapplication.dto.main.admin.MessageRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.MessageResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;

public interface MessageService {

    MessageResponseDto createMessage(MessageRequestDto messageRequestDto, HttpServletRequest request);
     Page<MessageResponseDto> getAllMessages(int page, int size);
    void deleteMessage(Long messageid);




}
