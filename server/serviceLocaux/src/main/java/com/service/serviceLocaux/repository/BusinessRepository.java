package com.service.serviceLocaux.repository;



import com.service.serviceLocaux.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;
@Repository

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByEmail(String email);
}


