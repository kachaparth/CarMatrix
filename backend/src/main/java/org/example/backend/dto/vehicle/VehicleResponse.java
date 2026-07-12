package org.example.backend.dto.vehicle;

import lombok.*;

import org.example.backend.enums.FuelType;
import org.example.backend.enums.TransmissionType;
import org.example.backend.enums.VehicleCategory;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleResponse {

    private Long id;

    private String make;

    private String model;

    private VehicleCategory category;

    private Integer manufacturingYear;

    private BigDecimal price;

    private FuelType fuelType;
    
    private String imageUrl;

    private TransmissionType transmissionType;

    private String color;

    private String description;

    // Comes from Inventory table
    private Integer availableStock;
}