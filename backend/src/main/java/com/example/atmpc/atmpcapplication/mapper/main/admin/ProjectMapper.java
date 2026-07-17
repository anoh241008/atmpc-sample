package com.example.atmpc.atmpcapplication.mapper.main.admin;

import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectResponseDto;
import com.example.atmpc.atmpcapplication.entity.main.ProjectEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProjectMapper {

    @Mapping(source = "projectphoto", target = "projectphoto")
    ProjectResponseDto toDto(ProjectEntity entity);

    ProjectEntity toEntity(ProjectRequestDto requestDto);

    void updateEntityFromDto(ProjectRequestDto requestDto,
                             @MappingTarget ProjectEntity entity);



}
