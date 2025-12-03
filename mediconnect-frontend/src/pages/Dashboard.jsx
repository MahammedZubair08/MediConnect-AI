import { useEffect, useState } from 'react';
import { 
  Container, Card, CardContent, Typography, Button, Box, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);
  
  // State for the Booking Modal
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check Login
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(storedUser));
    }

    // 2. Fetch Doctors
    fetch('http://localhost:8080/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Error:", err));
  }, []);

  // --- Modal Functions ---
  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  // --- The Actual Booking Logic ---
  const handleBookAppointment = async () => {
    if (!appointmentTime) {
      alert("Please select a time!");
      return;
    }

    const bookingData = {
      patientId: user.id, // Taking ID from the logged-in user
      doctorId: selectedDoctor.id,
      time: appointmentTime // Format comes as "2025-11-25T10:30"
    };

    try {
      const response = await fetch('http://localhost:8080/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert("Success! Appointment Booked with " + selectedDoctor.specialization);
        handleClose();
      } else {
        alert("Booking Failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error.");
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.fullName : "Guest"}
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Available Doctors
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          }
        }}
      >
        {doctors.map((doctor) => (
          <Box key={doctor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {doctor.specialization}
                </Typography>
                <Typography>
                  {doctor.qualification}
                </Typography>
                <Typography>
                  Exp: {doctor.experienceYears} Years
                </Typography>
                <Typography>
                  Fee: ${doctor.consultationFee}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                {/* On Click, we Open the Modal instead of doing nothing */}
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleOpen(doctor)}
                >
                  Book Appointment
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>

      {/* --- The Booking Pop-up Window (Dialog) --- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Booking with: <strong>{selectedDoctor?.specialization}</strong>
          </Typography>
          <Typography gutterBottom>
            Fee: ${selectedDoctor?.consultationFee}
          </Typography>
          
          {/* Native Date-Time Picker */}
          <TextField
            label="Select Date & Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleBookAppointment} variant="contained" color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}