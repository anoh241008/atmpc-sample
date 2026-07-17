package com.example.atmpc.atmpcapplication.mapper.services.RentalServices.admin;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.admin.*;

import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RoomEntity;

import org.mapstruct.*;

import java.math.BigDecimal;
import java.util.Locale;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AdminManagementMapper {
    //GET TENANT LIST WITH ROOMNUMBER ASSIGNED
    @Mapping(target = "roomnumber", source = "room.roomnumber")
    @Mapping(target = "user_type", ignore = true)
    TenantResponseDto getTenantListResponseDto(CustomerDetailsEntity entity);

    //GET ROOMLIST TO ASSGINED FOR TENANT
    @Mapping(target = "roomnumber", source = "roomnumber")
    @Mapping(target = "capacity", ignore = true)
    @Mapping(target = "monthlyrent", ignore = true)
    @Mapping(target = "branch", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "occupants", ignore = true)
    RoomResponseDto getRoomListForTenant(RoomEntity entity);



    //ASSIGNING ROOM FOR TENANT
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "approval", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "branch", ignore = true)
    @Mapping(target = "fullname", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "birthdate", ignore = true)
    @Mapping(target = "phonenumber", ignore = true)
    @Mapping(target = "occupation", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "contactname", ignore = true)
    @Mapping(target = "contactnumber", ignore = true)
    @Mapping(target = "relationshipcontact", ignore = true)
    @Mapping(target = "profilephoto", ignore = true)
    @Mapping(target = "dateDue", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "customerid", ignore = true)
    @Mapping(target = "user_type", ignore = true)
    void assignRoom(AssignRoomRequestDto requestDto, @MappingTarget CustomerDetailsEntity entity);


    //APPROVAL FOR TENANT
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "roomid", ignore = true)
    @Mapping(target = "branch", ignore = true)
    @Mapping(target = "fullname", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "birthdate", ignore = true)
    @Mapping(target = "phonenumber", ignore = true)
    @Mapping(target = "occupation", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "contactname", ignore = true)
    @Mapping(target = "contactnumber", ignore = true)
    @Mapping(target = "relationshipcontact", ignore = true)
    @Mapping(target = "profilephoto", ignore = true)
    @Mapping(target = "dateDue", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "customerid", ignore = true)
    @Mapping(target = "user_type", ignore = true)
    @Mapping(target = "approval", constant = "Approved")
    @Mapping(target = "status", constant = "Active")
    void approvalTenant(ApprovalTenantRequestDto requestDto,@MappingTarget CustomerDetailsEntity entity);

    //SET DUE TENANT
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "dateDue", source = "dateDue")
    void setDueTenant(SetDueTenantRequestDto dto, @MappingTarget CustomerDetailsEntity entity);

    //CREATE ROOM
    RoomEntity createRoom(RoomRequestDto requestDto);

    //UPDATE ROOM
    @Mapping(target = "branch", ignore = true)
    @Mapping(target = "roomid", ignore = true)
    @Mapping(target = "occupants", ignore = true)
    void updateRoom(RoomRequestDto requestDto, @MappingTarget RoomEntity entity);

    //GET ROOM LIST WITH NAME OF OCCUPANTS LIST
    @Mapping(target = "monthlyrent", qualifiedByName = "formatAmount")
    @Mapping(target = "occupants", source = "occupants")
    @Mapping(target = "status", expression = "java(computeStatus(entity))")
    RoomResponseDto getListRoom(RoomEntity entity);


    @Named("formatAmount")
    default String formatAmount(String raw) {
        if (raw == null || raw.isBlank()) {
            return "0.00";
        }
        try {
            BigDecimal value = new BigDecimal(raw);

            return String.format(Locale.US, "%,.2f", value);

        } catch (NumberFormatException e) {

            return raw;  // ← Potential issue here

        }
    }






    default String toFullname(CustomerDetailsEntity entity){
        return entity.getFullname();
    }

    //GET ROOM STATUS DEPEND ON WHICH BRANCH
    default String computeStatus(RoomEntity entity){

        int occupantCount = entity.getOccupants().size();

        int capacity = Integer.parseInt(entity.getCapacity());

        String branch = entity.getBranch();

        if(branch != null && branch.equalsIgnoreCase("CDO_Branch")){

            return occupantCount > 0 ? "Occupied" : "Vacant";

        }
        else{

            return occupantCount >= capacity ? "Occupied" : "Vacant";

        }



    }
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "approval", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "branch", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "birthdate", ignore = true)
    @Mapping(target = "phonenumber", ignore = true)
    @Mapping(target = "occupation", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "contactname", ignore = true)
    @Mapping(target = "contactnumber", ignore = true)
    @Mapping(target = "relationshipcontact", ignore = true)
    @Mapping(target = "dateDue", ignore = true)
    @Mapping(target = "user_type", ignore = true)
    TenantResponseDto getChatList( CustomerDetailsEntity entity);

}
