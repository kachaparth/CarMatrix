package org.example.backend.specification;

import jakarta.persistence.criteria.Predicate;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleCategory;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class VehicleSpecification {

    private VehicleSpecification() {
    }

    public static Specification<Vehicle> search(

            String make,
            String model,
            VehicleCategory category,
            BigDecimal minPrice,
            BigDecimal maxPrice
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (make != null && !make.isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("make")),
                                "%" + make.toLowerCase() + "%"
                        )
                );
            }

            if (model != null && !model.isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("model")),
                                "%" + model.toLowerCase() + "%"
                        )
                );
            }

            if (category != null) {

                predicates.add(
                        cb.equal(root.get("category"), category)
                );
            }

            if (minPrice != null) {

                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("price"),
                                minPrice
                        )
                );
            }

            if (maxPrice != null) {

                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("price"),
                                maxPrice
                        )
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}