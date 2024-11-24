package com.service.serviceLocaux.repository;

import com.service.serviceLocaux.model.UserBusinessRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBusinessRequestRepository extends JpaRepository<UserBusinessRequest, Long> {
    List<UserBusinessRequest> findByUserId(Long userId);
}
