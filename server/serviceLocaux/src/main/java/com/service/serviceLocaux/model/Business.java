package com.service.serviceLocaux.model;

import jakarta.persistence.*;

@Entity
@Table(name = "businesses")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name; // Name of the person or business owner

    @Column(nullable = false, length = 255)
    private String profession; // Profession or role

    @Column(nullable = false, length = 255)
    private String type; // Business type (self-employed or company)

    @Column(nullable = false, length = 255)
    private String shopName; // Name of the shop or company

    @Column(nullable = false, length = 255)
    private String businessName; // Business registration name

    @Column(nullable = false, length = 50)
    private String businessType; // Business type (e.g., retail, service)

    @Column(nullable = false, length = 255, unique = true)
    private String email; // Business email

    @Column(nullable = false, length = 255)
    private String password; // Encrypted password

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
}
