package com.example.atmpc.atmpcapplication.mapper.services.RentalServices.BillingAndPaymentMapper;

import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.BillingAndPaymentResponseDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.BillingAndPayment.RentPaymentWithRoomProjection;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.RentPaymentEntity;
import org.mapstruct.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Locale;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BillingAndPaymentMapper {

    @Mapping(target = "amount", qualifiedByName = "formatAmount")
    BillingAndPaymentResponseDto toPaymentList(RentPaymentWithRoomProjection entity);

    @Mapping(target = "amount", qualifiedByName = "formatAmount")
    @Mapping(target = "roomnumber", ignore = true)
    BillingAndPaymentResponseDto toPaymentResponse(RentPaymentEntity entity);

    @Named("formatAmount")
    default String formatAmount(String raw) {

        if (raw == null || raw.isBlank()) {

            return "0.00";

        }

        try {

            BigDecimal value = new BigDecimal(raw);

            return String.format(Locale.US, "%,.2f", value);

        } catch (NumberFormatException e) {

            return raw;

        }

    }

    @Mapping(target = "electricbill", source = "dto.electricbill")
    @Mapping(target = "amount", expression = "java(addAmount(entity.getAmount(), dto.getElectricbill()))")
    void toSingleRoomBilling(BillingAndPaymentDto dto, @MappingTarget RentPaymentEntity entity);

    @Named("addAmount")
    default String addAmount(String existingAmount, String electricbill) {

        BigDecimal current = parseAmount(existingAmount);

        BigDecimal additional = parseAmount(electricbill);

        return current.add(additional).toPlainString();

    }

    default BigDecimal parseAmount(String raw) {

        if (raw == null || raw.isBlank()) {

            return BigDecimal.ZERO;
        }

        try {

            return new BigDecimal(raw);

        } catch (NumberFormatException e) {

            return BigDecimal.ZERO;

        }

    }


    default void toPayment(@MappingTarget RentPaymentEntity entity) {

        String newStatus = toggleStatus(entity.getStatus());

        entity.setStatus(newStatus);
        entity.setDate_created(resolveDate(newStatus));

    }

    default LocalDate resolveDate(String newStatus) {

        if ("PAID".equalsIgnoreCase(newStatus)) {
            return LocalDate.now();
        }

        return null;
    }
    @Named("toggleStatus")
    default String toggleStatus(String currentStatus) {

        if ("PAID".equalsIgnoreCase(currentStatus)) {
            return "UNPAID";
        }

        return "PAID";
    }
}