package com.example.atmpc.atmpcapplication.mapper.authentication.Admin;


import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthServiceMapper {


    @Mapping(target = "email", source = "email")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "userid", source = "userid")
    @Mapping(target = "branch", source = "branch")
    LoginRequestReponseDto loginAdmin(Long userid, String email, String role, String branch);






}
