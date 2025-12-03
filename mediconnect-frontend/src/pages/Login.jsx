import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import for redirection

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        //alert("Login Successful! Welcome " + user.fullName);

        // Save user info locally so the browser remembers them
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to Home Page
        if (user.role === "DOCTOR") {
          alert("Welcome Dr. " + user.fullName);
          window.location.href = "/doctor-dashboard";
        } else {
          // Default for Patients
          window.location.href = "/";
        }
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Is Backend running?");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal" required fullWidth label="Email Address"
              name="email" autoFocus value={formData.email} onChange={handleChange}
            />
            <TextField
              margin="normal" required fullWidth label="Password"
              name="password" type="password" value={formData.password} onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}