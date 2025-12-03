package com.healthapp.backend.service;

import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Import this
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the encoder

    public User registerUser(User user) {
        // 1. Check if email exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        // 2. Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 3. Save
        return userRepository.save(user);
    }

    // UPDATE LOGIN LOGIC (To compare Hash vs Plain Text)
    public User loginUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null;
    }
}