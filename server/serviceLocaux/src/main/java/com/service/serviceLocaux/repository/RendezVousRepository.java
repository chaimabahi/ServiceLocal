package com.service.serviceLocaux.repository;

import com.service.serviceLocaux.model.RendezVous;
import com.service.serviceLocaux.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    List<RendezVous> findByUser(User user);
    List<RendezVous> findByUserId(Long userId);
    List<RendezVous> findByBusinessId(Long businessId);


}
