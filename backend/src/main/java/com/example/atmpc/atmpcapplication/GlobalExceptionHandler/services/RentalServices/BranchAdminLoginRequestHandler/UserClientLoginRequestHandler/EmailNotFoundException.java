package com.example.atmpc.atmpcapplication.GlobalExceptionHandler.services.RentalServices.BranchAdminLoginRequestHandler.UserClientLoginRequestHandler;

public class EmailNotFoundException extends RuntimeException{
    public EmailNotFoundException(String Message){
        super(Message);
    }
}
