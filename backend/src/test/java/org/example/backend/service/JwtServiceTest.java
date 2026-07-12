package org.example.backend.service;
import org.example.backend.security.JwtService;
import org.springframework.security.core.userdetails.UserDetails;
import org.example.backend.entity.User;
import org.example.backend.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    private User user;

    @BeforeEach
    void setUp() {

        jwtService = new JwtService();

        ReflectionTestUtils.setField(
                jwtService,
                "secret",
                "3b4b5d7c9e1f2a4c6d8e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s"
        );

        ReflectionTestUtils.setField(
                jwtService,
                "expiration",
                86400000L
        );

        user = User.builder()
                .id(1L)
                .email("parth@gmail.com")
                .role(Role.CUSTOMER)
                .build();
    }

    @Test
    void shouldGenerateToken() {

        String token = jwtService.generateToken(user);

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void shouldExtractEmail() {

        String token = jwtService.generateToken(user);

        String email = jwtService.extractEmail(token);

        assertEquals("parth@gmail.com", email);
    }

    @Test
    void shouldValidateToken() {

        String token = jwtService.generateToken(user);
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .builder()
                        .username("parth@gmail.com")
                        .password("password")
                        .roles("CUSTOMER")
                        .build();

        assertTrue(jwtService.isTokenValid(token, userDetails));
    }
}