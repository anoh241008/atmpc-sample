package com.example.atmpc.atmpcapplication.GlobalExceptionHandler.services.RentalServices.BranchAdminLoginRequestHandler.UserClientLoginRequestHandler;

public class InvalidPasswordException extends RuntimeException{
    public InvalidPasswordException(String Message ){
        super(Message);
    }
}
