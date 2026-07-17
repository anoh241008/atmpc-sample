package com.example.atmpc.atmpcapplication.entity.services.RentalServices;

import com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Enumerated.MessageStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_rental_message")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageid;

    private Long conversationid;

    private Long senderid;

    private String message;

    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();
}