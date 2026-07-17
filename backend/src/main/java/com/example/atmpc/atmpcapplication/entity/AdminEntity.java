package com.example.atmpc.atmpcapplication.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="tbl_admin")
@Getter
@Setter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="admin_type")
    private String admin_type;

    @Column(name="branch")
    private String branch;

    @Column(name="approval")
    private String approval;

    @Column(name="ipaddress", nullable = false)
    private String ipaddress;

    @Column(name="createdAt", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
