package com.service.serviceLocaux.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;


@Entity
@Table(name = "requests", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "business_id"})
}, indexes = {
        @Index(name = "idx_user_business", columnList = "user_id, business_id"),
        @Index(name = "idx_status", columnList = "status")
})
public class UserBusinessRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    @NotBlank(message = "Request type is required")
    @Column(nullable = false, length = 255)
    private String requestType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private RequestStatus status;

    @FutureOrPresent(message = "Requested date must be in the present or future")
    @Column(nullable = false)
    private LocalDateTime requestedDate;

    @Column(length = 500)
    private String description;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(LocalDateTime requestedDate) {
        this.requestedDate = requestedDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
