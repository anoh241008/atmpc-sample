package com.example.atmpc.atmpcapplication.dto.services.RentalServices.Chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

   private Long conversationid;

   private Long receiverid;

   private String message;

}
