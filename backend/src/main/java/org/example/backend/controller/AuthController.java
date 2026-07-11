package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.auth.LoginRequest;
import org.example.backend.dto.auth.LoginResponse;
import org.example.backend.dto.auth.RegisterRequest;
import org.example.backend.dto.auth.RegisterResponse;
import org.example.backend.entity.User;
import org.example.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody RegisterRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }
}