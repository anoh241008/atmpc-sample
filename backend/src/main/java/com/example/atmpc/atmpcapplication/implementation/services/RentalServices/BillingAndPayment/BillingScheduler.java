package com.example.atmpc.atmpcapplication.implementation.services.RentalServices.BillingAndPayment;

import com.example.atmpc.atmpcapplication.service.services.RentalServices.BillingAndPayment.BillingAndPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BillingScheduler {

    private final BillingAndPaymentService billingAndPaymentService;

    @Scheduled(cron = "0 0 1 * * *")
    public void runDailyBilling(){

        try{

            billingAndPaymentService.runDailyBilling();

        } catch (Exception e) {

            log.error("Billing scheduler run failed entirely",e);

        }

    }

}
