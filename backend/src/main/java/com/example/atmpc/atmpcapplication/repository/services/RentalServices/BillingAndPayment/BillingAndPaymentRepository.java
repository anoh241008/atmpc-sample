package com.example.atmpc.atmpcapplication.repository.services.RentalServices.BillingAndPayment;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.RentPaymentWithRoomProjection;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RentPaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface BillingAndPaymentRepository extends JpaRepository<RentPaymentEntity, Long> {

    //IF CUSTOMER HAS BILLED ALREADY IT WILL IGNORE
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM RentPaymentEntity r " +
            "WHERE r.customerid = :customerid AND r.month_topay = :month_topay")
    boolean existsByCustomeridAndMonth_topay(@Param("customerid") Long customerid,
                                             @Param("month_topay") String month_topay);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM RentPaymentEntity r " +
            "WHERE r.roomid = :roomid AND r.month_topay = :month_topay AND r.customerid IS NULL")
    boolean existsByRoomidAndMonth_topay(@Param("roomid") Integer roomid,
                                         @Param("month_topay") String month_topay);

    @Query(value = """
                    SELECT rp.paymentid, rp.customerid, rp.roomid, r.roomnumber,
                           rp.fullname, rp.electricbill, rp.month_topay,
                           rp.amount, rp.status, rp.date_created
                    FROM tbl_rental_rentpayment rp
                    JOIN tbl_rental_room r ON rp.roomid = r.roomid
                    WHERE EXISTS (
                        SELECT 1 FROM tbl_rental_customerdetails c
                        WHERE c.roomid = r.roomid
                          AND c.branch = COALESCE(
                              (SELECT branch FROM tbl_admin WHERE userid = :customerid),
                              (SELECT branch FROM tbl_rental_customerdetails WHERE customerid = :customerid)
                          )
                    )
                    AND (
                        :isAdmin = true
                        OR COALESCE(
                            (SELECT branch FROM tbl_admin WHERE userid = :customerid),
                            (SELECT branch FROM tbl_rental_customerdetails WHERE customerid = :customerid)
                        ) <> 'CDO_Branch'
                        OR (rp.electricbill IS NOT NULL AND rp.electricbill <> '')
                    )
                    AND (
                        :isAdmin = true
                        OR COALESCE(
                            (SELECT branch FROM tbl_rental_customerdetails WHERE customerid = :customerid),
                            ''
                        ) = 'CDO_Branch'
                        OR rp.customerid = :customerid
                    )
                    ORDER BY rp.paymentid DESC
            """,
            countQuery = """
                            SELECT COUNT(*)
                            FROM tbl_rental_rentpayment rp
                            JOIN tbl_rental_room r ON rp.roomid = r.roomid
                            WHERE EXISTS (
                                SELECT 1 FROM tbl_rental_customerdetails c
                                WHERE c.roomid = r.roomid
                                  AND c.branch = COALESCE(
                                      (SELECT branch FROM tbl_admin WHERE userid = :customerid),
                                      (SELECT branch FROM tbl_rental_customerdetails WHERE customerid = :customerid)
                                  )
                            )
                            AND (
                                :isAdmin = true
                                OR COALESCE(
                                    (SELECT branch FROM tbl_admin WHERE userid = :customerid),
                                    (SELECT branch FROM tbl_rental_customerdetails WHERE customerid = :customerid)
                                ) <> 'CDO_Branch'
                                OR (rp.electricbill IS NOT NULL AND rp.electricbill <> '')
                            )
                            AND (
                                :isAdmin = true
                                OR COALESCE(
                                    (SELECT branch FROM tbl_rental_customerdetails WHERE customerid = :customerid),
                                    ''
                                ) = 'CDO_Branch'
                                OR rp.customerid = :customerid
                            )
                    """, nativeQuery = true
    )
    Page<RentPaymentWithRoomProjection> findPaymentInSameBranch(
            @Param("customerid") Long customerid,
            @Param("isAdmin") boolean isAdmin,
            Pageable pageable);
}
