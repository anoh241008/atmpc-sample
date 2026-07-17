package com.example.atmpc.atmpcapplication.entity.services.RentalServices;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "tbl_rental_customerdetails")
public class CustomerDetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerid;

    @Column(name = "roomid")
    private Integer roomid;

    private String email;
    private String password;
    private String approval;
    private String status;
    private String branch;
    private String fullname;
    private String gender;
    private String birthdate;
    private String phonenumber;
    private String occupation;
    private String address;
    private String contactname;
    private String contactnumber;
    private String relationshipcontact;
    private String profilephoto;

    @Column(name="dateDue")
    private LocalDate dateDue;

    private String user_type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "roomid", referencedColumnName = "roomid", insertable = false, updatable = false),
            @JoinColumn(name = "branch", referencedColumnName = "branch", insertable = false, updatable = false)
    })
    private RoomEntity room;



}
