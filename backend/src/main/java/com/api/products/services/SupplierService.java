package com.api.products.services;

import com.api.products.entities.Supplier;
import com.api.products.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository repository;

    public List<Supplier> findAll() {
        return repository.findAll();
    }

    public Supplier findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));
    }

    public Supplier save(Supplier supplier) {
        return repository.save(supplier);
    }

    public void delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Supplier not found with id: " + id);
        }
    }

    public Supplier update(Long id, Supplier supplier) {
        Supplier currentSupplier = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));

        currentSupplier.setAdress(supplier.getAdress());
        currentSupplier.setDescription(supplier.getDescription());

        return repository.save(currentSupplier);
    }

    public List<Supplier> findByName(String name) {
        return repository.findByDescriptionContainingIgnoreCase(name);
    }
}

