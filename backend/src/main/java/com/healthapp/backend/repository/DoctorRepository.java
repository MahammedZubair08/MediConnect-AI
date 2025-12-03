package com.healthapp.backend.repository;

import com.healthapp.backend.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Basic CRUD is auto-generated!
    Doctor findByUserId(Long userId);
}