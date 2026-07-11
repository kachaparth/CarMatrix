package org.example.backend.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(
            ApiException ex,
            HttpServletRequest request) {

        System.out.println("ApiException Handler Called");

        return ResponseEntity.status(ex.getStatus())
                .body(ErrorResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(ex.getStatus().value())
                        .error(ex.getStatus().getReasonPhrase())
                        .message(ex.getMessage())
                        .path(request.getRequestURI())
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex,
            HttpServletRequest request) {

        return ResponseEntity.internalServerError()
                .body(ErrorResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(500)
                        .error("Internal Server Error")
                        .message("Something went wrong.")
                        .path(request.getRequestURI())
                        .build());
    }
}