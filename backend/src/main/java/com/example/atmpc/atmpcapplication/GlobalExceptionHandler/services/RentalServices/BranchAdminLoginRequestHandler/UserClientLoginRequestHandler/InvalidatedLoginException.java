package com.example.atmpc.atmpcapplication.GlobalExceptionHandler.services.RentalServices.BranchAdminLoginRequestHandler.UserClientLoginRequestHandler;

public class InvalidatedLoginException extends RuntimeException {
    public InvalidatedLoginException(String message) {
        super(message);
    }
}
