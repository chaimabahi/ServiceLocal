package com.service.serviceLocaux.controller;

import com.service.serviceLocaux.model.UserBusinessRequest;
import com.service.serviceLocaux.model.RequestStatus;
import com.service.serviceLocaux.service.UserBusinessRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class UserBusinessRequestController {

    @Autowired
    private UserBusinessRequestService requestService;

    // Créer une nouvelle demande
    @PostMapping
    public ResponseEntity<UserBusinessRequest> createRequest(@RequestBody UserBusinessRequest request) {
        UserBusinessRequest createdRequest = requestService.createRequest(request);
        return ResponseEntity.ok(createdRequest);
    }

    // Récupérer toutes les demandes d'un utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserBusinessRequest>> getRequestsByUser(@PathVariable Long userId) {
        List<UserBusinessRequest> requests = requestService.getRequestsByUser(userId);
        return ResponseEntity.ok(requests);
    }

    // Mettre à jour le statut d'une demande
    @PutMapping("/{requestId}")
    public ResponseEntity<UserBusinessRequest> updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam RequestStatus status) {
        UserBusinessRequest updatedRequest = requestService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok(updatedRequest);
    }
    @ControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(AuthenticationException.class)
        public ResponseEntity<String> handleAuthenticationException(AuthenticationException ex) {
            return new ResponseEntity<>("Authentication error: " + ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

}
