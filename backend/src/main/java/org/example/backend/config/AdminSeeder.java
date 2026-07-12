package org.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.User;
import org.example.backend.enums.Role;
import org.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AdminSeeder {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner createAdmin() {

        return args -> {

            if (!userRepository.existsByEmail("admin@gmail.com")) {

                User admin = User.builder()
                        .firstName("System")
                        .lastName("Admin")
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(admin);

                System.out.println("Admin created.");
            }
        };
    }
}