package com.example.atmpc.atmpcapplication.service.main.admin;

import com.example.atmpc.atmpcapplication.dto.main.admin.ContentRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ContentResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ContentService {
    ContentResponseDto createContent(ContentRequestDto requestDto, MultipartFile file);
    Page<ContentResponseDto> getAllContents(int page, int size);
    Page<ContentResponseDto> getLatestUpdate(int page, int size);
    Page<ContentResponseDto> getAnnouncementUpdate(int page, int size, List<String> types);
    Page<ContentResponseDto> getNewsEvent(int page, int size, List<String> types);
    ContentResponseDto updateContent(Long contentid, ContentRequestDto requestDto, MultipartFile file);
    void deleteContent(Long contentid);
}
