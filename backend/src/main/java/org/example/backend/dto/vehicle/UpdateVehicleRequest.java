package org.example.backend.dto.vehicle;

import jakarta.validation.constraints.*;
import lombok.*;

import org.example.backend.enums.FuelType;
import org.example.backend.enums.TransmissionType;
import org.example.backend.enums.VehicleCategory;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateVehicleRequest {

    @NotBlank
    private String make;

    @NotBlank
    private String model;

    @NotNull
    private VehicleCategory category;

    @NotNull
    private Integer manufacturingYear;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    private String imageUrl;

    @NotNull
    private FuelType fuelType;

    @NotNull
    private TransmissionType transmissionType;

    @NotBlank
    private String color;

    private String description;
}