package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.dto.inventory.PurchaseRequest;
import org.example.backend.dto.inventory.RestockRequest;
import org.example.backend.entity.Inventory;
import org.example.backend.security.CustomUserDetailsService;
import org.example.backend.security.JwtAuthenticationFilter;
import org.example.backend.service.InventoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InventoryController.class)
@AutoConfigureMockMvc(addFilters = false) // Bypasses security filter chain execution
class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private InventoryService inventoryService;

    // Required MockBeans to prevent Context Configuration errors
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void shouldRestockVehicleSuccessfully() throws Exception {
        RestockRequest request = RestockRequest.builder()
                .quantity(5)
                .build();

        when(inventoryService.restockVehicle(eq(1L), any(RestockRequest.class)))
                .thenReturn(new Inventory());

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

        when(inventoryService.purchaseVehicle(eq(1L), any(PurchaseRequest.class)))
                .thenReturn(new Inventory());

        mockMvc.perform(post("/api/vehicles/1/purchase")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
}