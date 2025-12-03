import { useState } from 'react';
import { 
  Container, Paper, TextField, Button, Typography, 
  Box, Card, CardContent, CircularProgress, Alert 
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // AI Icon

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      // Call our Java Backend (which calls Python)
      const response = await fetch(`http://localhost:8080/api/ai/analyze?symptoms=${encodeURIComponent(symptoms)}`);
      
      if (!response.ok) {
        throw new Error("Failed to connect to AI Service");
      }

      const result = await response.text(); // The backend returns plain text: "Specialist (Confidence: 99%)"
      setPrediction(result);
    } catch (err) {
      console.error("Error:", err);
      setError("AI Module is currently offline. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, textAlign: 'center', background: 'linear-gradient(to bottom right, #ffffff, #f0f4f8)' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <AutoAwesomeIcon sx={{ fontSize: 40, color: '#673ab7', mr: 1 }} />
          <Typography variant="h4" component="h1" fontWeight="bold" color="#333">
             MediConnect AI
          </Typography>
        </Box>

        <Typography color="textSecondary" paragraph sx={{ fontSize: '1.1rem' }}>
          Describe your symptoms in natural language. Our Machine Learning model will analyze them and recommend the right specialist for you.
        </Typography>

        <TextField
          label="How are you feeling? (e.g., I have a splitting headache and sensitivity to light)"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          sx={{ mb: 3, backgroundColor: 'white' }}
        />

        <Button 
          variant="contained" 
          size="large" 
          onClick={handleAnalyze}
          disabled={loading || !symptoms}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
          sx={{ 
            py: 1.5, px: 4, fontSize: '1rem', 
            backgroundColor: '#673ab7', 
            '&:hover': { backgroundColor: '#5e35b1' } 
          }}
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </Button>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
        )}

        {/* Prediction Result */}
        {prediction && (
          <Card sx={{ mt: 4, border: '2px solid #673ab7', backgroundColor: '#ede7f6' }}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Based on your symptoms, we recommend seeing a:
              </Typography>
              <Typography variant="h4" color="#673ab7" fontWeight="bold" sx={{ mt: 1 }}>
                {prediction}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Check the <strong>Dashboard</strong> to book an appointment with this specialist.
              </Typography>
            </CardContent>
          </Card>
        )}

      </Paper>
    </Container>
  );
}