package com.example.atmpc.atmpcapplication.repository.services.RentalServices.admin;


import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenantManagementRepository extends JpaRepository<CustomerDetailsEntity, Integer> {

    //GET TENANT LIST WITH ROOMNUMBER ASSIGNED
    @EntityGraph(attributePaths = {"room"})
    Page<CustomerDetailsEntity> findByBranch(@Param("branch") String branch, Pageable pageable);

    @Query("""
    SELECT c
    FROM CustomerDetailsEntity c
    WHERE c.branch = :branch
    """)
    List<CustomerDetailsEntity> findChatList(@Param("branch") String branch);

}
