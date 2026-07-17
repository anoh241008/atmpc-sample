package com.example.atmpc.atmpcapplication.implementation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class photoDirectory implements WebMvcConfigurer {

    @Value("${upload.photo.dir}")
    private String uploadPhototDir;

    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/photofiles/**")
                .addResourceLocations("file:" + uploadPhototDir + "/");
    }
}
