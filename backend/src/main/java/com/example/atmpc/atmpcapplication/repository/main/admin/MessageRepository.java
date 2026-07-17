package com.example.atmpc.atmpcapplication.repository.main.admin;

import com.example.atmpc.atmpcapplication.entity.main.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {

    Optional<MessageEntity> findTopByIpaddressOrderByCreatedAtDesc(String ipaddress);
}
