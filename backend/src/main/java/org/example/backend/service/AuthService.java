package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.auth.RegisterRequest;
import org.example.backend.entity.User;
import org.example.backend.enums.Role;
import org.example.backend.exception.ApiException;
import org.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT,
                    "Email already registered.");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .build();

        return userRepository.save(user);
    }
}