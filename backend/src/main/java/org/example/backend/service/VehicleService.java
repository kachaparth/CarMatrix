package org.example.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.vehicle.CreateVehicleRequest;
import org.example.backend.dto.vehicle.UpdateVehicleRequest;
import org.example.backend.dto.vehicle.VehicleResponse;
import org.example.backend.entity.Inventory;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleCategory;
import org.example.backend.exception.ApiException;
import org.example.backend.mapper.VehicleMapper;
import org.example.backend.repository.InventoryRepository;
import org.example.backend.repository.VehicleRepository;
import org.example.backend.specification.VehicleSpecification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final InventoryRepository inventoryRepository;
    private final VehicleMapper vehicleMapper;

    public VehicleResponse addVehicle(CreateVehicleRequest request) {

        vehicleRepository.findByMakeAndModelAndManufacturingYear(
                request.getMake(),
                request.getModel(),
                request.getManufacturingYear()
        ).ifPresent(vehicle -> {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "Vehicle already exists."
            );
        });

        Vehicle vehicle = vehicleMapper.toEntity(request);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        Inventory inventory = Inventory.builder()
                .vehicle(savedVehicle)
                .quantity(0)
                .minimumStock(5)
                .build();

        inventory = inventoryRepository.save(inventory);

        return vehicleMapper.toResponse(savedVehicle, inventory);
    }

    @Transactional
    public List<VehicleResponse> addVehicles(
            List<CreateVehicleRequest> requests
    ) {

        List<VehicleResponse> responses = new ArrayList<>();

        for (CreateVehicleRequest request : requests) {

            vehicleRepository.findByMakeAndModelAndManufacturingYear(
                    request.getMake(),
                    request.getModel(),
                    request.getManufacturingYear()
            ).ifPresent(vehicle -> {
                throw new ApiException(
                        HttpStatus.CONFLICT,
                        "Vehicle already exists: "
                                + request.getMake() + " "
                                + request.getModel()
                );
            });

            Vehicle vehicle = vehicleMapper.toEntity(request);

            Vehicle savedVehicle = vehicleRepository.save(vehicle);

            Inventory inventory = Inventory.builder()
                    .vehicle(savedVehicle)
                    .quantity(0)
                    .minimumStock(5)
                    .build();

            inventory = inventoryRepository.save(inventory);

            responses.add(
                    vehicleMapper.toResponse(savedVehicle, inventory)
            );
        }

        return responses;
    }

    public VehicleResponse getVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ApiException(
                                HttpStatus.NOT_FOUND,
                                "Vehicle not found."
                        ));

        Inventory inventory = getInventory(id);

        return vehicleMapper.toResponse(vehicle, inventory);
    }

    public List<VehicleResponse> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(vehicle ->
                        vehicleMapper.toResponse(
                                vehicle,
                                getInventory(vehicle.getId())
                        )
                )
                .toList();
    }

    public VehicleResponse updateVehicle(
            Long id,
            UpdateVehicleRequest request
    ) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ApiException(
                                HttpStatus.NOT_FOUND,
                                "Vehicle not found."
                        ));

        vehicleMapper.updateEntity(vehicle, request);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        Inventory inventory = getInventory(updatedVehicle.getId());

        return vehicleMapper.toResponse(updatedVehicle, inventory);
    }

    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ApiException(
                                HttpStatus.NOT_FOUND,
                                "Vehicle not found."
                        ));

        Inventory inventory = getInventory(id);

        inventoryRepository.delete(inventory);
        vehicleRepository.delete(vehicle);
    }

    public List<VehicleResponse> searchVehicles(
            String make,
            String model,
            VehicleCategory category,
            BigDecimal minPrice,
            BigDecimal maxPrice
    ) {

        return vehicleRepository.findAll(
                        VehicleSpecification.search(
                                make,
                                model,
                                category,
                                minPrice,
                                maxPrice
                        )
                )
                .stream()
                .map(vehicle ->
                        vehicleMapper.toResponse(
                                vehicle,
                                getInventory(vehicle.getId())
                        )
                )
                .toList();
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