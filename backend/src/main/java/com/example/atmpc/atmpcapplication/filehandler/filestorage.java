    package com.example.atmpc.atmpcapplication.filehandler;

    import com.example.atmpc.atmpcapplication.GlobalExceptionHandler.ValidationException;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;
    import java.nio.file.StandardCopyOption;
    import java.util.List;
    import java.util.UUID;

    @Service
    public class filestorage {

        @Value("${upload.photo.dir}")
        private String uploadPhototDir;
        private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;
        private static final List<String> allowedTypes = List.of(
                "image/jpeg",
                "image/png",
                "image/jpg"

        );
        public String upload(MultipartFile file){

            ValidateFile(file);

            try{

                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

                Path path = Paths.get(uploadPhototDir);

                if(!Files.exists(path)){

                    Files.createDirectories(path);

                }

                Path filpath = path.resolve(filename);

                Files.copy(file.getInputStream(), filpath, StandardCopyOption.REPLACE_EXISTING);

                return  filename;

            } catch (IOException e){

                throw new RuntimeException("File upload failed", e);

            }

        }

        public void deleteFile(String filename){

            try{
                if (filename == null || filename.isBlank()){

                    return;

                }

                Path filepath = Paths.get(uploadPhototDir)
                        .resolve(filename);

                Files.deleteIfExists(filepath);

            } catch (IOException e){

                throw new RuntimeException("Failed to delete file", e);

            }

        }

        public void ValidateFile(MultipartFile file){

            if (file == null || file.isEmpty()) {
                throw new ValidationException("Choose a file");
            }

            if( file.getSize() > MAX_FILE_SIZE) {

                throw new ValidationException("File too large, Max allowed is 10MB");

            }

            String contentType = file.getContentType();

            if( !allowedTypes.contains(contentType)){

                throw new ValidationException("Only image files are allowed (jpg, png, jpeg)");

            }
        }

    }
