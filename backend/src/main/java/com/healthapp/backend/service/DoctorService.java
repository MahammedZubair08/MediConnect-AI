package com.healthapp.backend.service;

import com.healthapp.backend.model.Doctor;
import com.healthapp.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Cacheable(value="docters")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
}