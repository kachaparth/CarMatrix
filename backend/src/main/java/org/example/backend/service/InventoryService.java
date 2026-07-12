package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.inventory.InventoryResponse;
import org.example.backend.dto.inventory.PurchaseRequest;
import org.example.backend.dto.inventory.RestockRequest;
import org.example.backend.entity.Inventory;
import org.example.backend.exception.ApiException;
import org.example.backend.repository.InventoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryResponse restockVehicle(Long vehicleId, RestockRequest request) {

        Inventory inventory = getInventory(vehicleId);

        inventory.setQuantity(
                inventory.getQuantity() + request.getQuantity()
        );

        inventory.setLastRestockedAt(LocalDateTime.now());

        Inventory updated = inventoryRepository.save(inventory);

        return InventoryResponse.builder()
                .vehicleId(updated.getVehicle().getId())
                .quantity(updated.getQuantity())
                .minimumStock(updated.getMinimumStock())
                .lastRestockedAt(updated.getLastRestockedAt())
                .build();
    }

    public InventoryResponse purchaseVehicle(Long vehicleId, PurchaseRequest request) {

        Inventory inventory = getInventory(vehicleId);

        if (inventory.getQuantity() < request.getQuantity()) {

            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "Insufficient stock."
            );
        }

        inventory.setQuantity(
                inventory.getQuantity() - request.getQuantity()
        );

        Inventory updated = inventoryRepository.save(inventory);

        return InventoryResponse.builder()
                .vehicleId(updated.getVehicle().getId())
                .quantity(updated.getQuantity())
                .minimumStock(updated.getMinimumStock())
                .lastRestockedAt(updated.getLastRestockedAt())
                .build();
    }

    private Inventory getInventory(Long vehicleId) {

        return inventoryRepository.findByVehicleId(vehicleId)
                .orElseThrow(() ->
                        new ApiException(
                                HttpStatus.NOT_FOUND,
                                "Inventory not found."
                        ));
    }

}