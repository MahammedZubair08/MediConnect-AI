import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);

    // Fetch appointments for this specific user
    fetch(`http://localhost:8080/api/appointments?patientId=${user.id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Appointment History
      </Typography>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Doctor</strong></TableCell>
              <TableCell><strong>Date & Time</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>
                   {appt.doctor.specialization} ({appt.doctor.qualification})
                </TableCell>
                <TableCell>
                  {new Date(appt.appointmentTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip label={appt.status} color="primary" variant="outlined" />
                </TableCell>
              </TableRow>
            ))}
            {appointments.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} align="center">No appointments found.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}