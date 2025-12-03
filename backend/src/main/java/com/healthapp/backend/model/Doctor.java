package com.healthapp.backend.model;
import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
@Entity
@Data
@Table(name = "doctors")
public class Doctor implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    private String specialization;
    private Integer experienceYears;
    private Double consultationFee;

    // --- ADD THIS LINE ---
    private String qualification;
    // ---------------------

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // Quick fix: Add this too if you don't have it, to track if they are available
    private Boolean isAvailable = true;
}
