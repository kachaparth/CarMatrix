package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.inventory.InventoryResponse;
import org.example.backend.dto.inventory.PurchaseRequest;
import org.example.backend.dto.inventory.RestockRequest;
import org.example.backend.entity.Inventory;
import org.example.backend.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/{id}/restock")
    public ResponseEntity<InventoryResponse> restock(

            @PathVariable Long id,

            @RequestBody RestockRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService.restockVehicle(id, request)
        );
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<InventoryResponse> purchase(

            @PathVariable Long id,

            @RequestBody PurchaseRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService.purchaseVehicle(id, request)
        );
    }

}