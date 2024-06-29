package com.api.products.repositories;

import com.api.products.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    List<Supplier> findByDescriptionContainingIgnoreCase(String description);
}
