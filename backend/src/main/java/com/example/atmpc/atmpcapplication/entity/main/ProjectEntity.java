package com.example.atmpc.atmpcapplication.entity.main;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_main_project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "projectid")
    private Long projectid;

    @Column(name = "projectname")
    private String projectname;

    @Column(name = "projectphoto")
    private String projectphoto;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;

    @Column(name = "budget")
    private String budget;

    @Column(name = "description")
    private String description;

    @Column(name = "progress")
    private String progress;
}
