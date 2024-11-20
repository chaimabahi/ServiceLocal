package com.service.serviceLocaux.controller;

import com.service.serviceLocaux.model.Business;
import com.service.serviceLocaux.repository.BusinessRepository;
import com.service.serviceLocaux.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/register")
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
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Business loginRequest) {
        Optional<Business> business = businessRepository.findByEmail(loginRequest.getEmail());

        if (business.isPresent()) {
            // Log the password matching process
            System.out.println("Password matches: " + passwordEncoder.matches(loginRequest.getPassword(), business.get().getPassword()));

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


}
