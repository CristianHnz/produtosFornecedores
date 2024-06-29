package com.api.products.controllers;

import com.api.products.entities.Supplier;
import com.api.products.entities.Product;
import com.api.products.services.SupplierService;
import com.api.products.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Product> save(@RequestBody Product product) {
        if (product.getSupplier() != null && product.getSupplier().getId() != null) {
            Supplier supplier = supplierService.findById(product.getSupplier().getId());
            product.setSupplier(supplier);
        }
        Product savedProduct = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.ok().body("Product deleted successfully");
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product) {
        if (product.getSupplier() != null && product.getSupplier().getId() != null) {
            Supplier supllier = supplierService.findById(product.getSupplier().getId());
            product.setSupplier(supllier);
        }
        Product updatedProduct = productService.update(id, product);
        return ResponseEntity.ok(updatedProduct);
    }
}
