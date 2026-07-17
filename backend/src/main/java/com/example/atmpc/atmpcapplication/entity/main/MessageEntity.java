package com.example.atmpc.atmpcapplication.entity.main;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name="tbl_main_message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="messageid")
    private long messageid;

    @Column(name="fullname")
    private String fullname;

    @Column(name="email")
    private String email;

    @Column(name="subjecttype")
    private String subjecttype;

    @Column(name="message")
    private String messagedesc;

    @Column(name="ipaddress", nullable = false)
    private String ipaddress;

    @Column(name="createdAt", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
