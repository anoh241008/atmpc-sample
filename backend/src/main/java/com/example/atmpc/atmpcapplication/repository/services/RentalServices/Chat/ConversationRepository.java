package com.example.atmpc.atmpcapplication.repository.services.RentalServices.Chat;

import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ConversationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<ConversationEntity, Long > {

    Optional<ConversationEntity> findByTenantidAndAdminid(Long tenantid, Long adminid);

    List<ConversationEntity> findByTenantidOrAdminid(Long tenantid, Long adminid);

}
