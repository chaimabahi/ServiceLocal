package com.service.serviceLocaux.controller;

import com.service.serviceLocaux.model.User;
import com.service.serviceLocaux.repository.UserRepository;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import com.service.serviceLocaux.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    // Register a new user
    @PostMapping("/register")
    @Consumes("application/json")
    @Produces("application/json")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Hash the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Login user
    @PostMapping("/login")
    @Consumes("application/json")
    @Produces("application/json")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            // Check password
            if (passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
                // Generate JWT token
                String token = jwtUtil.generateToken(existingUser.get().getEmail());

                // Return success message and token in JSON format
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("token", token); //front
                response.put("userId", String.valueOf(existingUser.get().getId()));  // Convert userId to String front

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Invalid password.");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    // Get all users
    @GetMapping("/all")
    @Produces("application/json")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{id}")
    @Produces("application/json")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    @Produces("application/json")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    // Update user
    @PutMapping("/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody User userDetails) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setFullName(userDetails.getFullName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setPhone(userDetails.getPhone());

            // You may want to update the password only if it's provided (ensure it's hashed)
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            userRepository.save(existingUser);
            return ResponseEntity.ok("User updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }


}
