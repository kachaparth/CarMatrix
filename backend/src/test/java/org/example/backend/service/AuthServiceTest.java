package org.example.backend.service;

import org.example.backend.dto.auth.LoginRequest;
import org.example.backend.dto.auth.LoginResponse;
import org.example.backend.dto.auth.RegisterRequest;
import org.example.backend.dto.auth.RegisterResponse;
import org.example.backend.entity.User;
import org.example.backend.enums.Role;
import org.example.backend.exception.ApiException;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User user;

    @BeforeEach
    void setUp() {

        registerRequest = new RegisterRequest();
        registerRequest.setFirstName("Parth");
        registerRequest.setLastName("Kacha");
        registerRequest.setEmail("parth@gmail.com");
        registerRequest.setPassword("password123");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("parth@gmail.com");
        loginRequest.setPassword("password123");

        user = User.builder()
                .id(1L)
                .firstName("Parth")
                .lastName("Kacha")
                .email("parth@gmail.com")
                .password("encodedPassword")
                .role(Role.CUSTOMER)
                .build();
    }

    @Test
    void shouldRegisterUserSuccessfully() {

        when(userRepository.existsByEmail(registerRequest.getEmail()))
                .thenReturn(false);

        when(passwordEncoder.encode(registerRequest.getPassword()))
                .thenReturn("encodedPassword");

        when(userRepository.save(any(User.class)))
                .thenReturn(user);

        RegisterResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("parth@gmail.com", response.getEmail());
        assertEquals("CUSTOMER", response.getRole());

        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        when(userRepository.existsByEmail(registerRequest.getEmail()))
                .thenReturn(true);

        ApiException exception = assertThrows(
                ApiException.class,
                () -> authService.register(registerRequest)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("Email already registered.", exception.getMessage());

        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldLoginSuccessfully() {

        when(userRepository.findByEmail(loginRequest.getEmail()))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()))
                .thenReturn(true);

        when(jwtService.generateToken(user))
                .thenReturn("jwt-token");

        LoginResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("parth@gmail.com", response.getEmail());
        assertEquals("CUSTOMER", response.getRole());
    }

    @Test
    void shouldThrowExceptionWhenEmailNotFound() {

        when(userRepository.findByEmail(loginRequest.getEmail()))
                .thenReturn(Optional.empty());

        ApiException exception = assertThrows(
                ApiException.class,
                () -> authService.login(loginRequest)
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        assertEquals("Invalid email or password.", exception.getMessage());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsIncorrect() {

        when(userRepository.findByEmail(loginRequest.getEmail()))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()))
                .thenReturn(false);

        ApiException exception = assertThrows(
                ApiException.class,
                () -> authService.login(loginRequest)
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        assertEquals("Invalid email or password.", exception.getMessage());
    }
}