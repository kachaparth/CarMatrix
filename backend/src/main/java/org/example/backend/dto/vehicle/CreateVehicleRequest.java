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
public class CreateVehicleRequest {

    @NotBlank(message = "Make is required.")
    private String make;

    @NotBlank(message = "Model is required.")
    private String model;

    @NotNull(message = "Category is required.")
    private VehicleCategory category;

    @NotNull(message = "Manufacturing year is required.")
    @Min(value = 1900)
    @Max(value = 2100)
    private Integer manufacturingYear;

    private String imageUrl;

    @NotNull(message = "Price is required.")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull(message = "Fuel type is required.")
    private FuelType fuelType;

    @NotNull(message = "Transmission type is required.")
    private TransmissionType transmissionType;

    @NotBlank(message = "Color is required.")
    private String color;

    private String description;
}