package com.service.serviceLocaux.controller;

import com.service.serviceLocaux.model.RendezVous;
import com.service.serviceLocaux.model.User;
import com.service.serviceLocaux.model.Business;
import com.service.serviceLocaux.repository.UserRepository;
import com.service.serviceLocaux.repository.BusinessRepository;
import com.service.serviceLocaux.service.RendezVousService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {

    private final RendezVousService rendezVousService;
    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;

    public RendezVousController(RendezVousService rendezVousService,
                                UserRepository userRepository,
                                BusinessRepository businessRepository) {
        this.rendezVousService = rendezVousService;
        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<RendezVous>> getRendezVousByBusinessId(@PathVariable Long businessId) {
        List<RendezVous> rendezVousList = rendezVousService.getRendezVousByBusinessId(businessId);
        return ResponseEntity.ok(rendezVousList);
    }




    @DeleteMapping("/{id}/business/{businessId}")
    public ResponseEntity<?> deleteRendezVousByBusiness(@PathVariable Long id, @PathVariable Long businessId) {
        try {
            // Check if the rendezvous exists
            RendezVous rendezVous = rendezVousService.getRendezVousById(id)
                    .orElseThrow(() -> new RuntimeException("Rendezvous not found"));

            // Check if the business ID matches the business associated with the rendezvous
            if (!rendezVous.getBusiness().getId().equals(businessId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to delete this rendezvous");
            }

            // Proceed with the deletion
            rendezVousService.deleteRendezVous(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Rendezvous deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



    @PostMapping
    public ResponseEntity<?> createRendezVous(@RequestBody RendezVous rendezVous) {
        try {
            // Validation de l'utilisateur
            if (rendezVous.getUser() == null || rendezVous.getUser().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID is required.");
            }
            User user = userRepository.findById(rendezVous.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Validation du business
            if (rendezVous.getBusiness() == null || rendezVous.getBusiness().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Business ID is required.");
            }
            Business business = businessRepository.findById(rendezVous.getBusiness().getId())
                    .orElseThrow(() -> new RuntimeException("Business not found"));

            // Validation de la date
            if (rendezVous.getDate() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Date is required.");
            }

            // Création du rendez-vous
            rendezVous.setUser(user);
            rendezVous.setBusiness(business);

            RendezVous createdRendezVous = rendezVousService.createRendezVous(rendezVous);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRendezVous);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllRendezVous() {
        try {
            // Retrieve all rendezvous from the service
            Iterable<RendezVous> rendezVousList = rendezVousService.getAllRendezVous();
            return ResponseEntity.status(HttpStatus.OK).body(rendezVousList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getRendezVousById(@PathVariable Long id) {
        try {
            // Retrieve the rendezvous by ID
            RendezVous rendezVous = rendezVousService.getRendezVousById(id)
                    .orElseThrow(() -> new RuntimeException("Rendezvous not found"));

            return ResponseEntity.status(HttpStatus.OK).body(rendezVous);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRendezVous(@PathVariable Long id) {
        try {
            // Check if the rendezvous exists
            if (!rendezVousService.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rendezvous not found");
            }

            // Proceed with the deletion
            rendezVousService.deleteRendezVous(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Rendezvous deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRendezVous(@PathVariable Long id, @RequestBody RendezVous rendezVous) {
        try {
            // Check if the rendezvous exists
            RendezVous existingRendezVous = rendezVousService.getRendezVousById(id)
                    .orElseThrow(() -> new RuntimeException("Rendezvous not found"));

            // Update only the fields that can be modified
            existingRendezVous.setDate(rendezVous.getDate());
            existingRendezVous.setBusiness(rendezVous.getBusiness());
            existingRendezVous.setUser(rendezVous.getUser());

            // Save the updated rendezvous
            RendezVous updatedRendezVous = rendezVousService.updateRendezVous(existingRendezVous);

            return ResponseEntity.status(HttpStatus.OK).body(updatedRendezVous);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }




}
