package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.dto.inventory.InventoryResponse;
import org.example.backend.dto.inventory.PurchaseRequest;
import org.example.backend.dto.inventory.RestockRequest;
import org.example.backend.security.CustomUserDetailsService;
import org.example.backend.security.JwtAuthenticationFilter;
import org.example.backend.service.InventoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InventoryController.class)
@AutoConfigureMockMvc(addFilters = false)
class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private InventoryService inventoryService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void shouldRestockVehicleSuccessfully() throws Exception {

        RestockRequest request = RestockRequest.builder()
                .quantity(5)
                .build();

        InventoryResponse response = InventoryResponse.builder()
                .vehicleId(1L)
                .quantity(15)
                .minimumStock(5)
                .lastRestockedAt(LocalDateTime.now())
                .build();

        when(inventoryService.restockVehicle(eq(1L), any(RestockRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/vehicles/1/restock")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldPurchaseVehicleSuccessfully() throws Exception {

        PurchaseRequest request = PurchaseRequest.builder()
                .quantity(2)
                .build();

        InventoryResponse response = InventoryResponse.builder()
                .vehicleId(1L)
                .quantity(8)
                .minimumStock(5)
                .lastRestockedAt(LocalDateTime.now())
                .build();

        when(inventoryService.purchaseVehicle(eq(1L), any(PurchaseRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/vehicles/1/purchase")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
}