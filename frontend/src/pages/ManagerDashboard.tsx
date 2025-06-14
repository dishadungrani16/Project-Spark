import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ZoneMetrics {
  zone: string;
  throughput: number;
  accuracy: number;
  idleTime: number;
  sentiment: number;
}

function ManagerDashboard() {
  const [metrics, setMetrics] = useState<ZoneMetrics[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Zone Manager Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Zone Performance
            </Typography>
            <LineChart
              width={800}
              height={400}
              data={metrics}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="throughput" stroke="#8884d8" />
              <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" />
              <Line type="monotone" dataKey="idleTime" stroke="#ffc658" />
              <Line type="monotone" dataKey="sentiment" stroke="#ff7300" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManagerDashboard; 