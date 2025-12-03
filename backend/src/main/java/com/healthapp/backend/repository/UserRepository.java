package com.healthapp.backend.repository;

import com.healthapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository gives us methods like save(), findAll(), findById() for free!
    //
    User findByEmail(String email);
}