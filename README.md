# 🏥 MediConnect AI – Smart Healthcare & Appointment Platform

MediConnect AI is a full-stack smart healthcare system designed to enable secure patient-doctor interaction, appointment scheduling, and intelligent AI-powered symptom diagnosis. Built using modern scalable architecture and industry-grade security standards.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, Material UI |
| Backend | Java Spring Boot |
| AI Service | Python (Flask Microservice) |
| Security | Spring Security 6, JWT, BCrypt |
| Database | MySQL |
| Caching | Redis |
| Architecture Style | REST APIs + Microservices |

---

## 📌 Core Features

- 👤 **Role-Based Dashboards** for Patients & Doctors  
- 🤖 **AI Symptom Checker** using Flask microservice  
- 📅 **Smart Appointment Booking System** with conflict handling  
- 🔐 **Secure Authentication** (JWT, BCrypt encryption, RBAC)  
- ⚡ **Optimized Server Responses** with Redis caching  
- 📱 **Responsive Modern UI** designed with Material UI  

---

## 🧠 System Architecture Overview

- The AI Diagnosis module is decoupled as a standalone microservice.
- Token-based authentication ensures secure access across services.

---

## 🛠 Engineering Highlights

### 🔹 Microservices Integration
- Built an independent Python/Flask microservice for AI diagnosis.
- Integrated with Spring Boot backend via REST APIs.

### 🔹 Security Enforcement
- Implemented Spring Security 6 with JWT authentication.
- Enforced BCrypt hashing and role-based access control (RBAC).

### 🔹 Performance Optimizations
- Added Redis caching for high-frequency endpoints (e.g., doctor directory).
- Resulted in **~80% faster response time** during peak usage.

### 🔹 Concurrency Safe Appointment System
- Implemented transactional logic to prevent double-booking conflicts.

### 🔹 Frontend User Experience
- Developed responsive UI with Material UI and state-driven React components.

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MahammedZubair08/mediconnect-ai.git
cd mediconnect-ai

