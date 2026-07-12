package org.example.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI carMatrixOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("CarMatrix API")
                                .version("1.0.0")
                                .description("Car Dealership Inventory Management System")
                                .contact(
                                        new Contact()
                                                .name("Parth Kacha")
                                                .email("kachaparth123@gmail.com")
                                )
                                .license(
                                        new License()
                                                .name("MIT License")
                                )
                );
    }
}