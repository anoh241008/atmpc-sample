package com.example.atmpc.atmpcapplication.repository;

import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> {



    Optional<AdminEntity> findByEmail(String email);

    Optional<AdminEntity> findTopByIpaddressOrderByCreatedAtDesc(String ipaddress);

    Optional<AdminEntity> findByBranch(String branch);

    AdminEntity findByUserid(Long userid);
}
