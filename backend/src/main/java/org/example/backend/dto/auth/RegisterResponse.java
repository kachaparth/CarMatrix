package org.example.backend.dto.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegisterResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String role;

    private String message;
}