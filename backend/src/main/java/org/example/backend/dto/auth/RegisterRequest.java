package org.example.backend.dto.auth;

import lombok.Getter;
import lombok.Setter;
import org.example.backend.enums.Role;

@Getter
@Setter
public class RegisterRequest {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Role role;
}