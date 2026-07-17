package com.example.atmpc.atmpcapplication.repository.main.admin;

import com.example.atmpc.atmpcapplication.entity.main.ContentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<ContentEntity, Long> {

    Page<ContentEntity> findByTypeIn(List<String> types,Pageable pageable);

}
