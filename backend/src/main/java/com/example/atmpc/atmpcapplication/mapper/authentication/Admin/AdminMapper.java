package com.example.atmpc.atmpcapplication.mapper.authentication.Admin;

import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.AdminRegistrationReponseDto;
import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AdminMapper {


    AdminEntity toEntity(AdminRegistrationRequestDto requestDto);

    AdminRegistrationReponseDto toDto(AdminEntity entity);



}
