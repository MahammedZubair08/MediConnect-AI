package com.healthapp.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity // 1. Tells Spring: "This class represents a table in the DB"
@Data   // 2. Lombok magic: Auto-generates Getters, Setters, toString
@Table(name = "users") // 3. Name of the table in MySQL
public class User {

    @Id // Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment (1, 2, 3...)
    private Long id;

    private String email;
    private String password;
    private String fullName;
    @Enumerated(EnumType.STRING)
    private Role role;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}