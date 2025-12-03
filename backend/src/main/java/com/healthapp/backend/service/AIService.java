package com.healthapp.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    // URL of our Python Microservice
    private final String PYTHON_API_URL = "http://localhost:5000/predict";

    public String analyzeSymptoms(String symptoms) {
        try {
            // 1. Prepare the data to send (JSON)
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> request = new HashMap<>();
            request.put("symptoms", symptoms);

            // 2. Send POST request to Python
            // We expect a Map (JSON) back
            Map<String, Object> response = restTemplate.postForObject(
                    PYTHON_API_URL,
                    request,
                    Map.class
            );

            // 3. Extract the prediction
            if (response != null && response.containsKey("specialist")) {
                String specialist = (String) response.get("specialist");
                String confidence = (String) response.get("confidence");
                return specialist + " (Confidence: " + confidence + ")";
            }

        } catch (Exception e) {
            System.err.println("Python Service is down: " + e.getMessage());
            // Fallback to basic logic if Python is offline
            return "General Physician (Fallback)";
        }
        return "Unknown";
    }
}