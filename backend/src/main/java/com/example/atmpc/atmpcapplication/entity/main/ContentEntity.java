package com.example.atmpc.atmpcapplication.entity.main;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Entity
@Table(name = "tbl_main_content")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contentid")
    private Long contentid;

    @Column(name = "contentphoto")
    private String contentphoto;

    @Column(name= "type")
    private String type;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

}
