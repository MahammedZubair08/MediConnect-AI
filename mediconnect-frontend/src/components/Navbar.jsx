import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Icon for Doctors

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); // Re-check user whenever the route changes

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login"; // Force refresh to clear state
  };

  // Helper to check if user is a doctor
  const isDoctor = user?.role === 'DOCTOR';

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Dynamic Background Color: Blue for Patients, Teal for Doctors */}
      <AppBar position="static" sx={{ backgroundColor: isDoctor ? "#009688" : "#1976d2" }}>
        <Toolbar>
          
          {/* LOGO SECTION */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            {isDoctor && <LocalHospitalIcon sx={{ marginRight: 1 }} />} 
            <Link to={isDoctor ? "/doctor-dashboard" : "/"} style={{ color: 'white', textDecoration: 'none' }}>
              {isDoctor ? "MediConnect PRO" : "MediConnect AI"}
            </Link>
          </Typography>
          
          {/* --- DOCTOR NAVIGATION --- */}
          {isDoctor ? (
            <>
              <Button color="inherit" component={Link} to="/doctor-dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/my-patients">My Patients</Button> {/* Placeholder for future features */}
            </>
          ) : (
            /* --- PATIENT NAVIGATION --- */
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              {user && (
                <Button color="inherit" component={Link} to="/my-appointments">My Appointments</Button>
              )}
              <Button 
                color="inherit" 
                component={Link} 
                to="/ai"
                startIcon={<AutoAwesomeIcon />}
                sx={{ border: '1px solid rgba(255,255,255,0.3)', mx: 1 }}
              >
                AI Checker
              </Button>
            </>
          )}

          {/* --- AUTH BUTTONS (Common for both) --- */}
          {user ? (
            <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2, backgroundColor: 'rgba(0,0,0,0.1)' }}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}