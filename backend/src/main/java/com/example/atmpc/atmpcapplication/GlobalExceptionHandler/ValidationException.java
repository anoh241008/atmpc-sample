package com.example.atmpc.atmpcapplication.GlobalExceptionHandler;

public class ValidationException extends RuntimeException {

    public ValidationException(String message) {
        super(message);
    }

}
