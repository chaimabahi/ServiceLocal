package com.service.serviceLocaux.controller;

import com.service.serviceLocaux.model.Business;
import com.service.serviceLocaux.repository.BusinessRepository;
import com.service.serviceLocaux.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register a new business
    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> registerBusiness(@RequestBody Business business) {
        try {
            // Hash the password before saving
            business.setPassword(passwordEncoder.encode(business.getPassword()));
            businessRepository.save(business);
            return ResponseEntity.status(HttpStatus.CREATED).body("Business registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Login a business
    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> login(@RequestBody Business loginRequest) {
        Optional<Business> business = businessRepository.findByEmail(loginRequest.getEmail());

        if (business.isPresent()) {
            if (passwordEncoder.matches(loginRequest.getPassword(), business.get().getPassword())) {
                String token = jwtUtil.generateToken(business.get().getEmail());
                return ResponseEntity.ok("Bearer " + token);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
        }
    }

    // Get all businesses
    @GetMapping(value = "/all" , produces = "application/json")
    public ResponseEntity<List<Business>> getAllBusinesses() {
        List<Business> businesses = businessRepository.findAll();
        return ResponseEntity.ok(businesses);
    }

    // Get a business by ID
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Business> getBusinessById(@PathVariable Long id) {
        Optional<Business> business = businessRepository.findById(id);
        if (business.isPresent()) {
            return ResponseEntity.ok(business.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Add a new business
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> addBusiness(@RequestBody Business business) {
        try {
            businessRepository.save(business);
            return ResponseEntity.status(HttpStatus.CREATED).body("Business added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Update an existing business
    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateBusiness(@PathVariable Long id, @RequestBody Business updatedBusiness) {
        Optional<Business> existingBusiness = businessRepository.findById(id);
        if (existingBusiness.isPresent()) {
            Business business = existingBusiness.get();
            business.setBusinessName(updatedBusiness.getBusinessName());
            business.setProfession(updatedBusiness.getProfession());
            business.setEmail(updatedBusiness.getEmail());
            if (updatedBusiness.getPassword() != null && !updatedBusiness.getPassword().isEmpty()) {
                business.setPassword(passwordEncoder.encode(updatedBusiness.getPassword()));
            }
            businessRepository.save(business);
            return ResponseEntity.ok("Business updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Business not found");
        }
    }

    // Delete a business
    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> deleteBusiness(@PathVariable Long id) {
        if (businessRepository.existsById(id)) {
            businessRepository.deleteById(id);
            return ResponseEntity.ok("Business deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Business not found");
        }
    }
}
