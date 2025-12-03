import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login'; // We will create this next!
import Dashboard from './pages/Dashboard';
import MyAppointments from './pages/MyAppointments';
import SymptomChecker from './pages/SymptomChecker';
import DoctorDashboard from './pages/DoctorDashboard';
import MyPatients from './pages/MyPatients';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<h1 ste={{textAlign:'center', marginTop:'20px'}}>Welcome to MediConnect AI</h1>} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/my-patients" element={<MyPatients />} />
        <Route path="/ai" element={<SymptomChecker />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;