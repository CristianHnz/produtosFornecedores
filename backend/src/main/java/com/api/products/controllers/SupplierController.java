package com.api.products.controllers;

import com.api.products.entities.Supplier;
import com.api.products.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/suppliers")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierController {
    @Autowired
    private SupplierService service;

    @GetMapping
    public ResponseEntity<List<Supplier>> findAll() {
        List<Supplier> suppliers = service.findAll();
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Supplier> findById(@PathVariable Long id) {
        Supplier supplier = service.findById(id);
        return ResponseEntity.ok(supplier);
    }

    @PostMapping
    public ResponseEntity<Supplier> save(@RequestBody Supplier supplier) {
        Supplier savedSupplier = service.save(supplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSupplier);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().body("Supplier deleted successfully");
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Supplier> update(@PathVariable Long id, @RequestBody Supplier supplier) {
        Supplier updatedSupplier = service.update(id, supplier);
        return ResponseEntity.ok(updatedSupplier);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Supplier>> findByName(@RequestParam String name) {
        List<Supplier> suppliers = service.findByName(name);
        return ResponseEntity.ok(suppliers);
    }
}