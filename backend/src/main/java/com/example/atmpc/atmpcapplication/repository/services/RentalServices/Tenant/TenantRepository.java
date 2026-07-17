package com.example.atmpc.atmpcapplication.repository.services.RentalServices.Tenant;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<CustomerDetailsEntity, Long>  {

    //FIND EMAIL TO LOGIN TENNANT
    Optional<CustomerDetailsEntity> findByEmail(String email);

    //FIND CUSTOMER DETAILS AFTER LOGGED IN WITH JOINING TO GET ROOM NUMBER ASSIGNED
    @EntityGraph(attributePaths = {"room"})
    Optional<CustomerDetailsEntity> findByCustomerid(@Param("customerid") Long customerid);

    //FIND WHO HAS DUE DATE TODAY TO GET THE DETAILS
    @Query("SELECT c FROM CustomerDetailsEntity c WHERE c.customerid = :customerid")
    Optional<CustomerDetailsEntity> findGetDueDate(@Param("customerid") Long customerid);

    @Query(value = """
    SELECT customerid FROM tbl_rental_customerdetails c
    WHERE DAY(c.dateDue) = DAY(CURRENT_DATE)
       OR (DAY(c.dateDue) > DAY(LAST_DAY(CURRENT_DATE))
           AND DAY(CURRENT_DATE) = DAY(LAST_DAY(CURRENT_DATE)))
    """, nativeQuery = true)
    List<Long> findCustomerIdsDueToday();


}
