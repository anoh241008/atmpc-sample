package com.example.atmpc.atmpcapplication.controller.services.RentalServices.admin;

import com.example.atmpc.atmpcapplication.config.JwtUtil;
import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin.*;
import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import com.example.atmpc.atmpcapplication.repository.AdminRepository;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.admin.AdminManagementService;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rental/admin")
@RequiredArgsConstructor
public class AdminManagementController {

    private final AdminManagementService service;

    private final JwtUtil jwtUtil;

    private  final AdminRepository adminRepository;

    @GetMapping("/tenantList")
    public ResponseEntity<ApiResponse<Page<TenantResponseDto>>> getAllTenants(

          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size

    )
    {

        Page<TenantResponseDto> responseDtos = service.getTenantList(page, size);

        return ResponseEntity.ok(

                new ApiResponse<>("Tenant List Retrieved Successfully", responseDtos)

        );
    }

    @GetMapping("/getRoomListToAssignForTenant")
    public ResponseEntity<ApiResponse<List<RoomResponseDto>>> getRoomListForTenantToAssign(){

        List<RoomResponseDto> responseDtos = service.getRoomListForTenantToAssign();

        return ResponseEntity.ok(

                new ApiResponse<>("Room list to assign for tenant retrieved successfully", responseDtos)

        );

    }

    @PutMapping("/approvalTenant/{customerid}")
    public ResponseEntity<ApiResponse<TenantResponseDto>> approvalTenant(
            @PathVariable("customerid") Integer customerid,
            ApprovalTenantRequestDto requestDto
    ){

        TenantResponseDto responseDto = service.approvalTenant(customerid, requestDto);

        return ResponseEntity.ok( new ApiResponse<>("Tenant Approved", responseDto));

    }

    @PutMapping("/setDueTenant/{customerid}")
    public ResponseEntity<ApiResponse<TenantResponseDto>> setDueTenant(
            @PathVariable("customerid") Integer customerid,
           @Valid @RequestBody SetDueTenantRequestDto requestDto
    ){

        TenantResponseDto responseDto = service.setDueTenant(customerid,requestDto);

        return ResponseEntity.ok(new ApiResponse<>("Tenant set due successfully", responseDto));

    }

    @DeleteMapping("/deleteTenant/{customerid}")
    public  ResponseEntity<ApiResponse<String>> deleteTenant(@PathVariable("customerid") Integer customerid){

        service.deleteTenant(customerid);

        return  ResponseEntity.ok(new ApiResponse<>("Tenant successfully Deleted", null));

    }

    @PutMapping("/assigningRoomToTenant/{customerid}")
    public ResponseEntity<ApiResponse<TenantResponseDto>> assignRoom(
           @PathVariable("customerid") Integer customerid,
           @Valid @RequestBody AssignRoomRequestDto requestDto
            ){

        TenantResponseDto responseDto = service.assignRoom(customerid, requestDto);

        return ResponseEntity.ok(new ApiResponse<>("You successfully assigned a room for tenant", responseDto));


    }


    @PostMapping("/createRoom")
    public ResponseEntity<ApiResponse<RoomResponseDto>> createRoom(

            @Valid @RequestBody RoomRequestDto requestDto

    ){

        RoomResponseDto reponseDto = service.createRoom(requestDto);

        return ResponseEntity.ok(new ApiResponse<>("Room successfully addeed", reponseDto));

    }

    @PutMapping("/updateRoom/{roomid}")
    public ResponseEntity<ApiResponse<RoomResponseDto>> updateRoom(
            @PathVariable("roomid") Integer roomid,
            @Valid @RequestBody RoomRequestDto requestDto

    ){

        RoomResponseDto reponseDto = service.updateRoom(roomid, requestDto);

        return  ResponseEntity.ok(new ApiResponse<>("Room Successfully Updated", reponseDto));

    }

    @GetMapping("/roomList")
    public ResponseEntity<ApiResponse<Page<RoomResponseDto>>> getRoomList(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size

    ){

        Page<RoomResponseDto> reponseDto = service.getRoomList(page, size);

        return ResponseEntity.ok(new ApiResponse<>("Room List Retrieved Successfully", reponseDto));

    }

    @GetMapping("/getChatList")
    public ResponseEntity<ApiResponse<List<TenantResponseDto>>> getChatList(){

        List<TenantResponseDto> responseDtos = service.getChatList();

        return ResponseEntity.ok(new ApiResponse<>("ChatList Retrieved Successfully", responseDtos));

    }

    // AdminController.java or similar
    @GetMapping("/byBranch/{branch}")
    public AdminEntity getAdminByBranch(@PathVariable String branch){
        return adminRepository.findByBranch(branch)
                .orElseThrow(() -> new RuntimeException("No admin found for branch"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {

        Long userid = jwtUtil.getUserIdFromRequest(request);

        AdminEntity admin = adminRepository.findById(userid)

                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(Map.of(
                "userid", admin.getUserid()
        ));
    }
}

