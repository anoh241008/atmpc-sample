package com.example.atmpc.atmpcapplication.implementation.services.RentalServices.Chat;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Chat.ChatMessageDto;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ConversationEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ChatMessageEntity;

import com.example.atmpc.atmpcapplication.repository.services.RentalServices.Chat.ConversationRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.Chat.ChatMessageRepository;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Enumerated.MessageStatus;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Service.ChatService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImplementation implements ChatService {

    private final ChatMessageRepository messageRepository;

    private final ConversationRepository conversationRepository;

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ConversationEntity getOrCreateConversation(Long adminid, Long tenantid){
        return getOrCreateConversationInternal(adminid, tenantid);
    }

    private ConversationEntity getOrCreateConversationInternal(Long adminid, Long tenantid){
        return conversationRepository.findByTenantidAndAdminid(tenantid, adminid)
                .orElseGet(() -> {
                    ConversationEntity conversation = new ConversationEntity();
                    conversation.setAdminid(adminid);
                    conversation.setTenantid(tenantid);
                    conversation.setCreatedAt(LocalDateTime.now());
                    return conversationRepository.save(conversation);
                });
    }

    @Transactional
    @Override
    public ChatMessageEntity sendMessage(Long senderid, ChatMessageDto requestDto){

        ConversationEntity conversation;

        if(requestDto.getConversationid() != null){

            conversation = conversationRepository.findById(
                    requestDto.getConversationid()).orElseThrow(
                    () -> new RuntimeException("Conversation not found")
            );

        }else{

            conversation = getOrCreateConversation(senderid, requestDto.getReceiverid());

        }

        ChatMessageEntity msg = new ChatMessageEntity();

        msg.setConversationid(conversation.getConversationid());
        msg.setSenderid(senderid);
        msg.setMessage(requestDto.getMessage());
        msg.setStatus(MessageStatus.SENT);
        msg.setCreatedAt(LocalDateTime.now());

        ChatMessageEntity saved = messageRepository.save(msg);

        messagingTemplate.convertAndSend(
                "/topic/conversation/" + conversation.getConversationid(),
                saved
        );

        return saved;

    }

    @Override
    public void markDelivered(Long messageid){

        ChatMessageEntity msg = messageRepository.findById(messageid).orElseThrow();

        if (msg.getStatus() == MessageStatus.SENT) {
            msg.setStatus(MessageStatus.DELIVERED);
            messageRepository.save(msg);
        }

    }

    @Override
    public void markRead(Long messageid){

        ChatMessageEntity msg = messageRepository.findById(messageid).orElseThrow();

        msg.setStatus(MessageStatus.READ);
        messageRepository.save(msg);
    }

    @Override
    public  void markAllDelivered(Long conversationid, Long userid){

        messageRepository.markAllAsReadOrDelivered(conversationid,userid,MessageStatus.DELIVERED);

        messagingTemplate.convertAndSend(
                "/topic/conversation/" + conversationid + "/status",
                Map.of("conversationid", conversationid, "status", "READ")
        );
    }

    @Override
    public void markAllRead(Long conversationid, Long userid){

        messageRepository.markAllAsReadOrDelivered(conversationid,userid,MessageStatus.READ);

    }

    @Override
    public Page<ChatMessageEntity> getConversationMessages(Long conversationid, int page, int size){

        return messageRepository.findByConversationidOrderByCreatedAtDescMessageidDesc(conversationid, PageRequest.of(page, size));

    }



}

