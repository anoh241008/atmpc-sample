package com.example.atmpc.atmpcapplication.implementation.main.admin;

import com.example.atmpc.atmpcapplication.dto.main.admin.ContentRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.ContentResponseDto;
import com.example.atmpc.atmpcapplication.entity.main.ContentEntity;
import com.example.atmpc.atmpcapplication.filehandler.filestorage;
import com.example.atmpc.atmpcapplication.mapper.main.admin.ContentMapper;
import com.example.atmpc.atmpcapplication.repository.main.admin.ContentRepository;
import com.example.atmpc.atmpcapplication.service.main.admin.ContentService;
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
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ContentServiceImplementation implements ContentService {

    private final ContentRepository repository;

    private final ContentMapper mapper;

    private final filestorage filestorage;

    @Value("${upload.photo.dir}")
    private  String uploadPhotoDir;

    @Override
    public ContentResponseDto createContent(

            ContentRequestDto requestDto,
            MultipartFile file

    ) {

        ContentEntity entity = mapper.toEntity(requestDto);

        String fileUrl = filestorage.upload(file);

        entity.setContentphoto(fileUrl);

        ContentEntity saved = repository.save(entity);

        return mapper.toDto(saved);

    }

    @Override
    public ContentResponseDto updateContent(
            Long contentid,
            ContentRequestDto requestDto,
            MultipartFile file
    ){
       ContentEntity existing = repository.findById(contentid)
               .orElseThrow(() -> new RuntimeException("Content not found"));

       mapper.updateEntityFromDto(requestDto, existing);

        if(file != null && !file.isEmpty()){

            filestorage.deleteFile(existing.getContentphoto());

            String newFileName = filestorage.upload(file);

            existing.setContentphoto(newFileName);

        }

        ContentEntity update = repository.save(existing);

        return mapper.toDto(update);



    }
    @Override
    public void deleteContent(Long contentid){

        ContentEntity entity = repository.findById(contentid)
                .orElseThrow(() -> new RuntimeException("Content is not found"));

        String imagePath = entity.getContentphoto();

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

    @Override
    public Page<ContentResponseDto> getAllContents(int page, int size){

    Pageable pageable = PageRequest.of(page, size);

    Page<ContentEntity> contents = repository.findAll(pageable);

    return contents.map(mapper::toDto);

    }

    @Override
    public Page<ContentResponseDto> getLatestUpdate(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "contentid"));

        Page<ContentEntity> contents = repository.findAll(pageable);

        return contents.map(mapper::toDto);
    }

    @Override
    public Page<ContentResponseDto> getAnnouncementUpdate(int page, int size, List<String> types)
    {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC,"contentid")
        );

        Page<ContentEntity> contents = repository.findByTypeIn(types, pageable);

        return contents.map(mapper::toDto);

    }

    @Override
    public Page<ContentResponseDto> getNewsEvent(int page, int size, List<String> types) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "contentid")
        );

        Page<ContentEntity> contents = repository.findByTypeIn(types, pageable);

        return contents.map(mapper::toDto);
    }
}

