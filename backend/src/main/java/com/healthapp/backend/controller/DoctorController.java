package com.healthapp.backend.controller;

import com.healthapp.backend.model.Appointment;
import com.healthapp.backend.model.Doctor;
import com.healthapp.backend.repository.AppointmentRepository;
import com.healthapp.backend.repository.DoctorRepository;
import com.healthapp.backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("http://localhost:5174") // Allow React
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }



    @GetMapping("/{userId}/appointments")
    public List<Appointment> getDoctorAppointments(@PathVariable Long userId) {
        // 1. Find the Doctor profile from the User ID

        Doctor doctor = doctorRepository.findByUserId(userId);
        if (doctor == null) {
            throw new RuntimeException("Doctor profile not found");
        }

        // 2. Return their appointments

        return appointmentRepository.findByDoctorId(doctor.id); // Assuming field is public or has getter
    }

}