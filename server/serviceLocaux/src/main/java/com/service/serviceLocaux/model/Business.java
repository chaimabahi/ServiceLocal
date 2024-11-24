package com.service.serviceLocaux.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "businesses")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Business owner's name is required")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(nullable = false, length = 255)
    private String name;

    @NotBlank(message = "Profession is required")
    @Column(nullable = false, length = 255)
    private String profession;

    @NotBlank(message = "Business type is required")
    @Column(nullable = false, length = 255)
    private String type;

    @NotBlank(message = "Shop name is required")
    @Column(nullable = false, length = 255)
    private String shopName;

    @NotBlank(message = "Business registration name is required")
    @Column(nullable = false, length = 255)
    private String businessName;

    @NotBlank(message = "Business type is required")
    @Column(nullable = false, length = 50)
    private String businessType;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(nullable = false, length = 255, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String password; // Encrypted password

    // Relationship with requests
    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserBusinessRequest> requests;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<UserBusinessRequest> getRequests() {
        return requests;
    }

    public void setRequests(List<UserBusinessRequest> requests) {
        this.requests = requests;
    }
}
