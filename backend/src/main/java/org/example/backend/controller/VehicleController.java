package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.vehicle.CreateVehicleRequest;
import org.example.backend.dto.vehicle.UpdateVehicleRequest;
import org.example.backend.dto.vehicle.VehicleResponse;
import org.example.backend.enums.VehicleCategory;
import org.example.backend.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<VehicleResponse> addVehicle(
            @Valid @RequestBody CreateVehicleRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(vehicleService.addVehicle(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponse> getVehicle(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.getVehicle(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponse>> getAllVehicles() {

        return ResponseEntity.ok(
                vehicleService.getAllVehicles()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponse> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody UpdateVehicleRequest request) {

        return ResponseEntity.ok(
                vehicleService.updateVehicle(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(
            @PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<VehicleResponse>> searchVehicles(

            @RequestParam(required = false)
            String make,

            @RequestParam(required = false)
            String model,

            @RequestParam(required = false)
            VehicleCategory category,

            @RequestParam(required = false)
            BigDecimal minPrice,

            @RequestParam(required = false)
            BigDecimal maxPrice) {

        return ResponseEntity.ok(

                vehicleService.searchVehicles(
                        make,
                        model,
                        category,
                        minPrice,
                        maxPrice
                )
        );
    }
}