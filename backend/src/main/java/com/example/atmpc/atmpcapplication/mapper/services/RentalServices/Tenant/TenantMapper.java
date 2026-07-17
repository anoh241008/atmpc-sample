package com.example.atmpc.atmpcapplication.mapper.services.RentalServices.Tenant;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantProfileRequestDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TenantMapper {
    //TENANT REGISTRATION
    @Mapping(target = "approval", constant = "Disapproved")
    @Mapping(target = "status", constant = "In Acive")
    @Mapping(target = "user_type", constant = "TENANT_ADMIN")
     CustomerDetailsEntity registerTenant(TenantRegistrationRequestDto dto);

    //TENANT UPDATE PROFILE
    void updateProfile(TenantProfileRequestDto dto, @MappingTarget CustomerDetailsEntity entity);

    //TENANT RESPONSE
    @Mapping(target = "roomnumber", source = "room.roomnumber")
    TenantResponseDto tenantDetailsResponse(CustomerDetailsEntity entity);


}
