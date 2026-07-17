package com.example.atmpc.atmpcapplication.entity.services.RentalServices;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_rental_conversation",
        uniqueConstraints = @UniqueConstraint(columnNames = {"tenantid", "adminid"}))
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationid;

    private Long tenantid;

    private Long adminid;

    private LocalDateTime createdAt = LocalDateTime.now();

}
