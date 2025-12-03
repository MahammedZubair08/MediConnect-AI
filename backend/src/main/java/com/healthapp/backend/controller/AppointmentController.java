package com.healthapp.backend.controller;

import com.healthapp.backend.model.Appointment;
import com.healthapp.backend.repository.AppointmentRepository;
import com.healthapp.backend.service.AppointmentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;


    @Autowired
    private AppointmentRepository appointmentRepository;



    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody BookingRequest request) {
        return appointmentService.bookAppointment(
                request.getPatientId(),
                request.getDoctorId(),
                request.getTime()
        );
    }


    @GetMapping
    public List<Appointment> getAppointments(@RequestParam Long patientId) {
        // URL will be: GET /api/appointments?patientId=1

        return appointmentRepository.findByPatientId(patientId);
    }
}

// Helper Class to receive JSON data
@Data
class BookingRequest {
    private Long patientId;
    private Long doctorId;
    private String time;

    public Long getDoctorId() {
        return doctorId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public String getTime() {
        return time;
    }
}