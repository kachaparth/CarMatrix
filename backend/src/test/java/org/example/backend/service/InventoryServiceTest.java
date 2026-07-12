package org.example.backend.service;

import org.example.backend.dto.inventory.PurchaseRequest;
import org.example.backend.dto.inventory.RestockRequest;
import org.example.backend.entity.Inventory;
import org.example.backend.exception.ApiException;
import org.example.backend.repository.InventoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @Test
    void shouldRestockVehicleSuccessfully() {

        Inventory inventory = Inventory.builder()
                .quantity(10)
                .minimumStock(5)
                .build();

        RestockRequest request = RestockRequest.builder()
                .quantity(5)
                .build();

        when(inventoryRepository.findByVehicleId(1L))
                .thenReturn(Optional.of(inventory));

        when(inventoryRepository.save(any(Inventory.class)))
                .thenReturn(inventory);

        Inventory result = inventoryService.restockVehicle(1L, request);

        assertEquals(15, result.getQuantity());

        verify(inventoryRepository).save(any(Inventory.class));
    }

    @Test
    void shouldPurchaseVehicleSuccessfully() {

        Inventory inventory = Inventory.builder()
                .quantity(10)
                .minimumStock(5)
                .build();

        PurchaseRequest request = PurchaseRequest.builder()
                .quantity(4)
                .build();

        when(inventoryRepository.findByVehicleId(1L))
                .thenReturn(Optional.of(inventory));

        when(inventoryRepository.save(any(Inventory.class)))
                .thenReturn(inventory);

        Inventory result = inventoryService.purchaseVehicle(1L, request);

        assertEquals(6, result.getQuantity());

        verify(inventoryRepository).save(any(Inventory.class));
    }

    @Test
    void shouldThrowExceptionWhenStockIsInsufficient() {

        Inventory inventory = Inventory.builder()
                .quantity(2)
                .minimumStock(5)
                .build();

        PurchaseRequest request = PurchaseRequest.builder()
                .quantity(5)
                .build();

        when(inventoryRepository.findByVehicleId(1L))
                .thenReturn(Optional.of(inventory));

        assertThrows(ApiException.class,
                () -> inventoryService.purchaseVehicle(1L, request));

        verify(inventoryRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenInventoryNotFound() {

        when(inventoryRepository.findByVehicleId(1L))
                .thenReturn(Optional.empty());

        RestockRequest request = RestockRequest.builder()
                .quantity(5)
                .build();

        assertThrows(ApiException.class,
                () -> inventoryService.restockVehicle(1L, request));
    }
}