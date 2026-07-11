package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.config.SecurityConfig;
import org.example.backend.dto.vehicle.CreateVehicleRequest;
import org.example.backend.dto.vehicle.VehicleResponse;
import org.example.backend.enums.FuelType;
import org.example.backend.enums.TransmissionType;
import org.example.backend.enums.VehicleCategory;
import org.example.backend.exception.GlobalExceptionHandler;
import org.example.backend.service.VehicleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VehicleController.class)
@Import({GlobalExceptionHandler.class, SecurityConfig.class})
@AutoConfigureMockMvc(addFilters = false)
class VehicleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    VehicleService vehicleService;

    @Test
    void shouldCreateVehicle() throws Exception {

        CreateVehicleRequest request = CreateVehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .category(VehicleCategory.SUV)
                .manufacturingYear(2024)
                .price(new BigDecimal("4500000"))
                .fuelType(FuelType.DIESEL)
                .transmissionType(TransmissionType.AUTOMATIC)
                .color("White")
                .description("SUV")
                .build();

        VehicleResponse response = VehicleResponse.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category(VehicleCategory.SUV)
                .manufacturingYear(2024)
                .price(new BigDecimal("4500000"))
                .fuelType(FuelType.DIESEL)
                .transmissionType(TransmissionType.AUTOMATIC)
                .color("White")
                .availableStock(10)
                .build();

        when(vehicleService.addVehicle(any()))
                .thenReturn(response);

        mockMvc.perform(post("/api/vehicles")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.make").value("Toyota"))
                .andExpect(jsonPath("$.model").value("Fortuner"));
    }

    @Test
    void shouldGetVehicleById() throws Exception {

        VehicleResponse response = VehicleResponse.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category(VehicleCategory.SUV)
                .manufacturingYear(2024)
                .price(new BigDecimal("4500000"))
                .fuelType(FuelType.DIESEL)
                .transmissionType(TransmissionType.AUTOMATIC)
                .color("White")
                .availableStock(10)
                .build();

        when(vehicleService.getVehicle(1L))
                .thenReturn(response);

        mockMvc.perform(get("/api/vehicles/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void shouldReturnAllVehicles() throws Exception {

        when(vehicleService.getAllVehicles())
                .thenReturn(List.of());

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk());
    }
}