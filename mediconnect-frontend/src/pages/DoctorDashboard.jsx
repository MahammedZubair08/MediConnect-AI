import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    
    // Security Check: Kick them out if they are not a doctor
    if (user.role !== "DOCTOR") {
        navigate("/");
        return;
    }

    setDoctorName(user.fullName);

    // Fetch appointments using the User ID
    fetch(`http://localhost:8080/api/doctors/${user.id}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Doctor Dashboard 👨‍⚕️
      </Typography>
      <Typography variant="h6" gutterBottom>
        Welcome, {doctorName}
      </Typography>
      
      <TableContainer component={Paper} elevation={3} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Date & Time</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>
                   {appt.patient.fullName} 
                </TableCell>
                <TableCell>
                  {new Date(appt.appointmentTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={appt.status} 
                    color={appt.status === "SCHEDULED" ? "warning" : "success"} 
                  />
                </TableCell>
                <TableCell>
                    {appt.status === "SCHEDULED" && (
                        <Button variant="contained" color="success" size="small">
                            Mark Done
                        </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
            {appointments.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} align="center">No upcoming appointments.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}