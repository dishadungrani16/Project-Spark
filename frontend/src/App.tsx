import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kiosk from './pages/Kiosk';
import Missions from './pages/Missions';
import Feedback from './pages/Feedback';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="kiosk" element={<Kiosk />} />
          <Route path="missions" element={<Missions />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="manager" element={<ManagerDashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App; 