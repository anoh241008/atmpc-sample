package com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Service;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Chat.ChatMessageDto;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ChatMessageEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ConversationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {

    ChatMessageEntity sendMessage(Long senderid, ChatMessageDto requestDto);

    void markDelivered(Long messageid);

    void markRead(Long messageid);

    void markAllDelivered(Long conversationid, Long userid);

    void markAllRead(Long conversationid, Long userid);

    Page<ChatMessageEntity> getConversationMessages(Long conversationid, int page, int size);

    ConversationEntity getOrCreateConversation(Long adminid, Long tenantid);

}
