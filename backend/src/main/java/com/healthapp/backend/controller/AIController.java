package com.healthapp.backend.controller;

import com.healthapp.backend.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*") // Allow all for easy testing
public class AIController {

    @Autowired
    private AIService aiService;

    @GetMapping("/analyze")
    public String analyze(@RequestParam String symptoms) {
        // URL: GET /api/ai/analyze?symptoms=I have a headache
        return aiService.analyzeSymptoms(symptoms);
    }
}