package com.healthapp.backend.controller;

import com.healthapp.backend.model.User;
import com.healthapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users") // Base URL for this controller
@CrossOrigin("http://localhost:5174") // Allow React to communicate
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // @RequestBody converts JSON data from Postman/React into Java User object
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        // We expect the frontend to send a JSON with just email and password
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedInUser != null) {
            return loggedInUser;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}