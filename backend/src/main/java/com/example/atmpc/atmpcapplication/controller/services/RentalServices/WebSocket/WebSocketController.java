package com.example.atmpc.atmpcapplication.controller.services.RentalServices.WebSocket;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Chat.ChatMessageDto;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@RequiredArgsConstructor
@Controller
public class WebSocketController {

    private final  ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessageDto requestDto, Principal principal){

        Long senderid = Long.parseLong(principal.getName());

        chatService.sendMessage(senderid, requestDto);

    }

}
