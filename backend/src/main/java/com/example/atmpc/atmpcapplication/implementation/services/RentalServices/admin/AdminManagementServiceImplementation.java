package com.example.atmpc.atmpcapplication.implementation.services.RentalServices.admin;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin.*;
import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RoomEntity;
import com.example.atmpc.atmpcapplication.mapper.authentication.Admin.AuthServiceMapper;
import com.example.atmpc.atmpcapplication.mapper.services.RentalServices.admin.AdminManagementMapper;
import com.example.atmpc.atmpcapplication.repository.AdminRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.admin.RoomManagementRepository;
import com.example.atmpc.atmpcapplication.repository.services.RentalServices.admin.TenantManagementRepository;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.admin.AdminManagementService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.example.atmpc.atmpcapplication.filehandler.filestorage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminManagementServiceImplementation implements AdminManagementService {

    private final TenantManagementRepository tenantManagementRepository;

    private final RoomManagementRepository roomManagementRepository;

    private final AdminRepository adminRepository;

    private final AdminManagementMapper mapper;

    private final filestorage filestorage;

    private final AuthServiceMapper authMapper;

    //GET BRANCH ALL TRANSACT
    private AdminEntity getCurrentAdmin() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

    }

    //GET TENANTLIST WITH ROOMNUMBER
    @Override
    public Page<TenantResponseDto> getTenantList(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        String branch = getCurrentAdmin().getBranch();

        return  tenantManagementRepository.findByBranch(branch,pageable)
                .map(mapper::getTenantListResponseDto);
    }

    //GET ROOMLIST TO ASSIGN FOR TENANT
    @Override
    public List<RoomResponseDto> getRoomListForTenantToAssign(){

        String branch = getCurrentAdmin().getBranch();

        return roomManagementRepository.getRoomListForTenantByBranch(branch)
                .stream()
                .map(mapper::getRoomListForTenant)
                .collect(Collectors.toList());

    }

    //APPROVAL FOR TENANT
    public TenantResponseDto approvalTenant(Integer customerid, ApprovalTenantRequestDto requestDto){

        CustomerDetailsEntity existing = tenantManagementRepository.findById(customerid)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        mapper.approvalTenant(requestDto, existing);

        CustomerDetailsEntity approval = tenantManagementRepository.save(existing);

        return mapper.getTenantListResponseDto(approval);

    }

    //SET DUE DATE FOR TENANT
    @Override
    public TenantResponseDto setDueTenant(Integer customerid, SetDueTenantRequestDto requestDto){

        CustomerDetailsEntity existing = tenantManagementRepository.findById(customerid)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        mapper.setDueTenant(requestDto,existing);

        CustomerDetailsEntity setDue = tenantManagementRepository.save(existing);

        return mapper.getTenantListResponseDto(setDue);


    }

    //DELETE TO TENANT
    public TenantResponseDto deleteTenant(Integer customerid){

        CustomerDetailsEntity  tenant = tenantManagementRepository.findById(customerid)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        String photoFile = tenant.getProfilephoto();

        if(photoFile != null && !photoFile.isEmpty()){

            filestorage.deleteFile(photoFile);

        }

        TenantResponseDto responseDto = mapper.getTenantListResponseDto(tenant);

        tenantManagementRepository.delete(tenant);

        return responseDto;
    }

    //ASSIGNING ROOM TO TENANT
    @Override
    public TenantResponseDto assignRoom(Integer customerid, AssignRoomRequestDto requestDto){

        CustomerDetailsEntity existing = tenantManagementRepository.findById(customerid)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        mapper.assignRoom(requestDto, existing);

        CustomerDetailsEntity assign = tenantManagementRepository.save(existing);

        return mapper.getTenantListResponseDto(assign);

    }

    //CREATING ROOM
    @Override
    public RoomResponseDto createRoom(RoomRequestDto requestDto){

        String branch = getCurrentAdmin().getBranch();

        RoomEntity roomEntity = mapper.createRoom(requestDto);

        roomEntity.setBranch(branch);

        RoomEntity saveRoom = roomManagementRepository.save(roomEntity);

        return mapper.getListRoom(saveRoom);

    }

    //UPDATE ROOM
    @Override
    public RoomResponseDto updateRoom(Integer roomid, RoomRequestDto requestDto){

        RoomEntity existing = roomManagementRepository.findById(roomid)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        mapper.updateRoom(requestDto, existing);

        RoomEntity update = roomManagementRepository.save(existing);

        return mapper.getListRoom(update);

    }
    //GET ROOM LIST WITH OCCUPANTS EACH ROOMNUMBER
    @Override
    public Page<RoomResponseDto> getRoomList(int page, int size){

        Pageable pageable = PageRequest.of(page, size);

        String branch = getCurrentAdmin().getBranch();

        return roomManagementRepository.findByBranch(branch, pageable)
                .map(mapper::getListRoom);

    }

    //GET TENANT CHATLIST
    @Override
    public List<TenantResponseDto> getChatList(){

        String branch = getCurrentAdmin().getBranch();

        return tenantManagementRepository.findChatList(branch)
                .stream()
                .map(tenant -> mapper.getChatList(tenant))
                .toList();

    }




}
