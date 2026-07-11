package org.example.backend.dto.vehicle;

import lombok.*;

import org.example.backend.enums.VehicleCategory;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleSearchRequest {

    private String make;

    private String model;

    private VehicleCategory category;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;
}