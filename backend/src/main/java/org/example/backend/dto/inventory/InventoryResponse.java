package org.example.backend.dto.inventory;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InventoryResponse {

    private Long vehicleId;

    private Integer quantity;

    private Integer minimumStock;

    private LocalDateTime lastRestockedAt;
}