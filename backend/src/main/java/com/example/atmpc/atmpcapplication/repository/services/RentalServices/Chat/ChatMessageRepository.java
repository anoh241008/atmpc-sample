package com.example.atmpc.atmpcapplication.repository.services.RentalServices.Chat;

import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ChatMessageEntity;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Enumerated.MessageStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {


    @Modifying
    @Transactional
    @Query("UPDATE ChatMessageEntity m SET m.status = :status WHERE m.id = :id")
    void updateStatus(@Param("messageid") Long id, @Param("status") MessageStatus status);


    @Modifying
    @Transactional
    @Query("""
    UPDATE ChatMessageEntity m
    SET m.status = :status
    WHERE m.conversationid = :conversationId
    AND m.senderid <> :userId
""")
    void markAllAsReadOrDelivered(
            @Param("conversationId") Long conversationid,
            @Param("userId") Long userid,
            @Param("status") MessageStatus status
    );

    Page<ChatMessageEntity> findByConversationidOrderByCreatedAtDescMessageidDesc(Long conversationid, Pageable pageable);

}
