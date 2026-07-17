package com.example.atmpc.atmpcapplication.mapper.main.admin;


import com.example.atmpc.atmpcapplication.dto.main.admin.MessageRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.MessageResponseDto;
import com.example.atmpc.atmpcapplication.entity.main.MessageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",  unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MessageMapper {

    MessageResponseDto toDto(MessageEntity entity);

    MessageEntity toEntity(MessageRequestDto requestDto);

}
