import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box, Divider, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

export default function MyPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);

    if (user.role !== "DOCTOR") {
      navigate("/");
      return;
    }

    // 1. Fetch all appointments for this doctor
    fetch(`http://localhost:8080/api/doctors/${user.id}/appointments`)
      .then(res => res.json())
      .then(data => {
        // 2. Process data to find UNIQUE patients
        const patientMap = new Map();

        data.forEach(appt => {
            const p = appt.patient;
            if (!patientMap.has(p.id)) {
                // If patient not in map, add them with visit count 1
                patientMap.set(p.id, { 
                    ...p, 
                    visitCount: 1, 
                    lastVisit: appt.appointmentTime 
                });
            } else {
                // If patient exists, just increase visit count
                const existing = patientMap.get(p.id);
                existing.visitCount += 1;
                // Update last visit if this one is newer
                if (new Date(appt.appointmentTime) > new Date(existing.lastVisit)) {
                    existing.lastVisit = appt.appointmentTime;
                }
            }
        });

        // Convert Map back to Array
        setPatients(Array.from(patientMap.values()));
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        My Patients List 📋
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {patients.map((patient) => (
          <Grid item key={patient.id} xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#f5f5f5' }}>
                <Avatar sx={{ bgcolor: '#009688', mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                    <Typography variant="h6">{patient.fullName}</Typography>
                    <Typography variant="body2" color="textSecondary">{patient.email}</Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight="bold">Total Visits:</Typography>
                    <Chip label={patient.visitCount} size="small" color="primary" />
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {patients.length === 0 && (
            <Typography variant="h6" color="textSecondary" sx={{ mt: 4, ml: 3 }}>
                No patients found yet.
            </Typography>
        )}
      </Grid>
    </Container>
  );
}