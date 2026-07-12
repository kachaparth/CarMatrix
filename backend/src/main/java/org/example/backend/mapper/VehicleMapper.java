package org.example.backend.mapper;

import org.example.backend.dto.vehicle.CreateVehicleRequest;
import org.example.backend.dto.vehicle.UpdateVehicleRequest;
import org.example.backend.dto.vehicle.VehicleResponse;
import org.example.backend.entity.Inventory;
import org.example.backend.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {

    public Vehicle toEntity(CreateVehicleRequest request) {

        return Vehicle.builder()
                .make(request.getMake())
                .model(request.getModel())
                .category(request.getCategory())
                .manufacturingYear(request.getManufacturingYear())
                .price(request.getPrice())
                .fuelType(request.getFuelType())
                .transmissionType(request.getTransmissionType())
                .color(request.getColor())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .build();
    }

    public void updateEntity(Vehicle vehicle,
                             UpdateVehicleRequest request) {

        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setCategory(request.getCategory());
        vehicle.setManufacturingYear(request.getManufacturingYear());
        vehicle.setPrice(request.getPrice());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setImageUrl(request.getImageUrl());
        vehicle.setTransmissionType(request.getTransmissionType());
        vehicle.setColor(request.getColor());
        vehicle.setDescription(request.getDescription());
    }

    public VehicleResponse toResponse(
            Vehicle vehicle,
            Inventory inventory) {

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .make(vehicle.getMake())
                .model(vehicle.getModel())
                .category(vehicle.getCategory())
                .manufacturingYear(vehicle.getManufacturingYear())
                .price(vehicle.getPrice())
                .fuelType(vehicle.getFuelType())
                .transmissionType(vehicle.getTransmissionType())
                .color(vehicle.getColor())
                .description(vehicle.getDescription())
                .imageUrl(vehicle.getImageUrl())
                .availableStock(inventory.getQuantity())
                .build();
    }
}