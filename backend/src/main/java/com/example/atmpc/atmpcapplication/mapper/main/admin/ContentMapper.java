package com.example.atmpc.atmpcapplication.mapper.main.admin;

import com.example.atmpc.atmpcapplication.dto.main.admin.ContentRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ContentResponseDto;
import com.example.atmpc.atmpcapplication.entity.main.ContentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentMapper {

    @Mapping(source = "contentphoto", target = "contentphoto")
    ContentResponseDto toDto(ContentEntity entity);

    ContentEntity toEntity(ContentRequestDto requestDto);

    void updateEntityFromDto(ContentRequestDto requestDto,
                             @MappingTarget ContentEntity entity
    );

}
