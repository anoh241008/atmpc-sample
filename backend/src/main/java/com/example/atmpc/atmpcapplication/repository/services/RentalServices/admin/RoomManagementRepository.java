package com.example.atmpc.atmpcapplication.repository.services.RentalServices.admin;

import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RoomEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface RoomManagementRepository extends JpaRepository<RoomEntity, Integer> {
    //GET ROOMLIST WITH LIST OF OCCUPANTS
    @EntityGraph(attributePaths = {"occupants"})
    Page<RoomEntity> findByBranch(String Branch, Pageable pageable);

    //GET ROOMLIST TO ASSGIN FRO TENANT
    List<RoomEntity> getRoomListForTenantByBranch(String branch);

    @Query("SELECT r FROM RoomEntity r WHERE r.roomid = :roomid")
    Optional<RoomEntity> findMonthlyRentByRoomId(@Param("roomid") Integer roomid);



}
