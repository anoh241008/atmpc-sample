package com.example.atmpc.atmpcapplication.implementation.main.admin;

import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ProjectResponseDto;
import com.example.atmpc.atmpcapplication.entity.main.ProjectEntity;
import com.example.atmpc.atmpcapplication.filehandler.filestorage;
import com.example.atmpc.atmpcapplication.mapper.main.admin.ProjectMapper;
import com.example.atmpc.atmpcapplication.repository.main.admin.ProjectRepository;
import com.example.atmpc.atmpcapplication.service.main.admin.ProjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImplementation implements ProjectService {
    private final ProjectRepository repository;
    private final ProjectMapper mapper;
    private final filestorage filestorage;

    @Value("${upload.photo.dir}")
    private String uploadPhotoDir;

    @Override
    public ProjectResponseDto createProject(
            ProjectRequestDto requestDto,
            MultipartFile file
    ){

        ProjectEntity entity = mapper.toEntity(requestDto);

        String fileUrl = filestorage.upload(file);

        entity.setProjectphoto(fileUrl);

        ProjectEntity save = repository.save(entity);

        return mapper.toDto(save);

    }

    @Override
    public Page<ProjectResponseDto> getAllProject(int page, int size){

        Pageable pageable = PageRequest.of(page, size);

        Page<ProjectEntity> contents = repository.findAll(pageable);

        return contents.map(mapper::toDto);
    }


    @Override
    public Page<ProjectResponseDto> getFeatureProject(int page, int size){

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "projectid")
                );

        Page<ProjectEntity> contents = repository.findAll(pageable);

        return contents.map(mapper::toDto);
    }

    @Override
    public ProjectResponseDto updateProject(
            Long projectid,
            ProjectRequestDto requestDto,
            MultipartFile file
    ) {

        ProjectEntity existing = repository.findById(projectid)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        mapper.updateEntityFromDto(requestDto, existing);

        if(file != null && !file.isEmpty()){

            filestorage.deleteFile(existing.getProjectphoto());

            String newFilename = filestorage.upload(file);

            existing.setProjectphoto(newFilename);

        }

        ProjectEntity update = repository.save(existing);

        return mapper.toDto(update);
    }

    @Override
    public void deleteProject(Long projectid){
        ProjectEntity entity  = repository.findById(projectid)
                .orElseThrow(() -> new RuntimeException("Project id not found"));

        String imagePath = entity.getProjectphoto();

        if(imagePath != null && !imagePath.isEmpty()){

            try{

                Path filepath = Paths.get(uploadPhotoDir)
                        .resolve(imagePath.substring(imagePath.lastIndexOf("/") + 1));

                if(Files.exists(filepath)){

                    Files.delete(filepath);

                }

            }catch (IOException e){

                throw new RuntimeException("Failed to delete image file");

            }

        }

        repository.delete(entity);
    }
}
