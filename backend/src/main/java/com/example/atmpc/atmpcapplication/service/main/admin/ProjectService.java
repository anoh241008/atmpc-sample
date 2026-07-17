package com.example.atmpc.atmpcapplication.service.main.admin;
import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;


public interface ProjectService {
   ProjectResponseDto createProject(ProjectRequestDto requestDto, MultipartFile file);
   Page<ProjectResponseDto> getAllProject(int page, int size);
   ProjectResponseDto updateProject(Long projectid, ProjectRequestDto requestDto, MultipartFile file);
   Page<ProjectResponseDto> getFeatureProject(int page, int size);
   void deleteProject(Long projectid);
}
