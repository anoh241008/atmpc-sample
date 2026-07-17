package com.example.atmpc.atmpcapplication.service.services.RentalServices.admin;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin.*;
import org.springframework.data.domain.Page;

import java.util.List;


public interface AdminManagementService {
    //GET TENANTLIST WITH ASSIGNED ROOMNUMBER
    Page<TenantResponseDto> getTenantList(int page, int size);

    //GET ROOMLIST TO ASSIGN A ROOM FOR TENANT
    List<RoomResponseDto> getRoomListForTenantToAssign();

    //APPROVAL FOR TENANT
    TenantResponseDto approvalTenant(Integer customerid, ApprovalTenantRequestDto requestDto);

    //DELETE FOR TENANT
    TenantResponseDto deleteTenant(Integer customerid);
    //ASSIGNING ROOM FOR TENANT
    TenantResponseDto assignRoom(Integer customerid, AssignRoomRequestDto requestDto);

    //CREATE ROOM
    RoomResponseDto createRoom(RoomRequestDto requestDto);

    //UPDATE ROOM
    RoomResponseDto updateRoom(Integer roomid, RoomRequestDto requestDto);

    //GET ROOMLIST WITH OCCUPANTLIST EACH ROOM NUMBER
    Page<RoomResponseDto> getRoomList(int page, int size);

    List<TenantResponseDto> getChatList();

    //SET DUE TENANT
    TenantResponseDto setDueTenant(Integer customerid, SetDueTenantRequestDto requestDto);

}
