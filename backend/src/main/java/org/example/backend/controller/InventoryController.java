package org.example.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.inventory.InventoryResponse;
import org.example.backend.dto.inventory.PurchaseRequest;
import org.example.backend.dto.inventory.RestockRequest;
import org.example.backend.entity.Inventory;
import org.example.backend.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Inventory",
        description = "Inventory Management APIs"
)
@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InventoryResponse> restock(

            @PathVariable Long id,

            @RequestBody RestockRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService.restockVehicle(id, request)
        );
    }

    @Operation(summary = "Purchase Vehicle")
    @PostMapping("/{id}/purchase")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<InventoryResponse> purchase(

            @PathVariable Long id,

            @RequestBody PurchaseRequest request
    ) {

        return ResponseEntity.ok(
                inventoryService.purchaseVehicle(id, request)
        );
    }

}