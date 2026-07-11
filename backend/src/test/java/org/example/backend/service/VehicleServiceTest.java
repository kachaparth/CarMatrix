package org.example.backend.service;

import org.example.backend.dto.vehicle.CreateVehicleRequest;
import org.example.backend.dto.vehicle.VehicleResponse;
import org.example.backend.entity.Inventory;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.FuelType;
import org.example.backend.enums.TransmissionType;
import org.example.backend.enums.VehicleCategory;
import org.example.backend.exception.ApiException;
import org.example.backend.mapper.VehicleMapper;
import org.example.backend.repository.InventoryRepository;
import org.example.backend.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private VehicleMapper vehicleMapper;

    @InjectMocks
    private VehicleService vehicleService;

    @Test
    void shouldAddVehicleSuccessfully() {

        CreateVehicleRequest request = CreateVehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .manufacturingYear(2024)
                .category(VehicleCategory.SUV)
                .price(new BigDecimal("4500000"))
                .fuelType(FuelType.DIESEL)
                .transmissionType(TransmissionType.AUTOMATIC)
                .color("White")
                .description("SUV")
                .build();

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .manufacturingYear(2024)
                .category(VehicleCategory.SUV)
                .price(new BigDecimal("4500000"))
                .fuelType(FuelType.DIESEL)
                .transmissionType(TransmissionType.AUTOMATIC)
                .color("White")
                .description("SUV")
                .build();

        Inventory inventory = Inventory.builder()
                .id(1L)
                .vehicle(vehicle)
                .quantity(0)
                .minimumStock(5)
                .build();

        VehicleResponse response = VehicleResponse.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .availableStock(0)
                .build();

        when(vehicleRepository.findByMakeAndModelAndManufacturingYear(
                anyString(),
                anyString(),
                anyInt()))
                .thenReturn(Optional.empty());

        when(vehicleMapper.toEntity(any(CreateVehicleRequest.class)))
                .thenReturn(vehicle);

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(vehicle);

        when(inventoryRepository.save(any(Inventory.class)))
                .thenReturn(inventory);

        when(vehicleMapper.toResponse(vehicle, inventory))
                .thenReturn(response);

        VehicleResponse result = vehicleService.addVehicle(request);

        assertNotNull(result);
        assertEquals("Toyota", result.getMake());
        assertEquals("Fortuner", result.getModel());

        verify(vehicleRepository).save(any(Vehicle.class));
        verify(inventoryRepository).save(any(Inventory.class));
        verify(vehicleMapper).toEntity(any(CreateVehicleRequest.class));
        verify(vehicleMapper).toResponse(vehicle, inventory);
    }

    @Test
    void shouldThrowExceptionWhenVehicleAlreadyExists() {

        CreateVehicleRequest request = CreateVehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .manufacturingYear(2024)
                .build();

        when(vehicleRepository.findByMakeAndModelAndManufacturingYear(
                anyString(),
                anyString(),
                anyInt()))
                .thenReturn(Optional.of(new Vehicle()));

        assertThrows(ApiException.class,
                () -> vehicleService.addVehicle(request));

        verify(vehicleRepository, never()).save(any());
        verify(inventoryRepository, never()).save(any());
    }
}