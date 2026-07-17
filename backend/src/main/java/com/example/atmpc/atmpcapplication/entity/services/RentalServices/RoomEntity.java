package com.example.atmpc.atmpcapplication.entity.services.RentalServices;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "tbl_rental_room")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomid;


    private String roomnumber;
    private String capacity;
    private String monthlyrent;
    private String branch;


    //To list the occupancies on each room
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "roomid", referencedColumnName = "roomid", insertable = false, updatable = false),
            @JoinColumn(name = "branch", referencedColumnName = "branch", insertable = false, updatable = false)
    })
    @BatchSize(size = 10)
    private List<CustomerDetailsEntity> occupants = new ArrayList<>();



}