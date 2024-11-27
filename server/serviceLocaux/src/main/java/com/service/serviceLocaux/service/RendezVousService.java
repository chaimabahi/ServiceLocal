package com.service.serviceLocaux.service;

import com.service.serviceLocaux.model.RendezVous;
import com.service.serviceLocaux.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RendezVousService {


    @Autowired
    private RendezVousRepository rendezVousRepository;

    public List<RendezVous> getRendezVousByBusinessId(Long businessId) {
        return rendezVousRepository.findByBusinessId(businessId);
    }

    public RendezVousService(RendezVousRepository rendezVousRepository) {
        this.rendezVousRepository = rendezVousRepository;
    }



    public Iterable<RendezVous> getAllRendezVous() {
        return rendezVousRepository.findAll();
    }

    public Optional<RendezVous> getRendezVousById(Long id) {
        return rendezVousRepository.findById(id);
    }

    public RendezVous createRendezVous(RendezVous rendezVous) {
        return rendezVousRepository.save(rendezVous);
    }

    public RendezVous updateRendezVous(RendezVous updatedRendezVous) {
        if (updatedRendezVous.getId() == null) {
            throw new IllegalArgumentException("Rendezvous ID cannot be null");
        }

        // Ensure the existing rendezvous is fetched before updating
        return rendezVousRepository.findById(updatedRendezVous.getId())
                .map(existingRendezVous -> {
                    // Perform any necessary updates to the existing object
                    existingRendezVous.setDate(updatedRendezVous.getDate());
                    existingRendezVous.setBusiness(updatedRendezVous.getBusiness());
                    existingRendezVous.setUser(updatedRendezVous.getUser());
                    // Set other fields if necessary
                    return rendezVousRepository.save(existingRendezVous);
                })
                .orElseThrow(() -> new RuntimeException("Rendezvous not found"));
    }

    public boolean existsById(Long id) {
        return rendezVousRepository.existsById(id);
    }

    public void deleteRendezVous(Long id) {
        rendezVousRepository.deleteById(id);
    }


}

