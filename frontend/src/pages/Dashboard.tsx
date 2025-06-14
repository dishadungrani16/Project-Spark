import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PerformanceData {
  timestamp: string;
  throughput: number;
  accuracy: number;
  idleTime: number;
}

function Dashboard() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    // Fetch performance data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Performance Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <LineChart
              width={800}
              height={400}
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="throughput" stroke="#8884d8" />
              <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" />
              <Line type="monotone" dataKey="idleTime" stroke="#ffc658" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 