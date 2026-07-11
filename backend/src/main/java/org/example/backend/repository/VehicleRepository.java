package org.example.backend.repository;

import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>,
        JpaSpecificationExecutor<Vehicle> {

    Optional<Vehicle> findByMakeAndModelAndManufacturingYear(
            String make,
            String model,
            Integer manufacturingYear
    );

}