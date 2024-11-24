package com.service.serviceLocaux.service;

import com.service.serviceLocaux.model.UserBusinessRequest;
import com.service.serviceLocaux.model.RequestStatus;
import com.service.serviceLocaux.repository.UserBusinessRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserBusinessRequestService {

    @Autowired
    private UserBusinessRequestRepository requestRepository;

    // Créer une nouvelle demande
    public UserBusinessRequest createRequest(UserBusinessRequest request) {
        request.setStatus(RequestStatus.PENDING); // Par défaut, une nouvelle demande est en attente
        request.setRequestedDate(java.time.LocalDateTime.now());
        return requestRepository.save(request);
    }

    // Récupérer les demandes d'un utilisateur
    public List<UserBusinessRequest> getRequestsByUser(Long userId) {
        return requestRepository.findByUserId(userId);
    }

    // Mettre à jour le statut d'une demande
    public UserBusinessRequest updateRequestStatus(Long requestId, RequestStatus status) {
        UserBusinessRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return requestRepository.save(request);
    }
}
