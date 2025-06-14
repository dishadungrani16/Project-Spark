import { Box, Typography, Paper, Grid } from '@mui/material';

function Kiosk() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Digital Signage & Kiosk
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tip of the Hour
            </Typography>
            <Typography>
              Remember to scan items twice to ensure accuracy in the picking process.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quality Metrics
            </Typography>
            <Typography>
              Current Zone Accuracy: 98.5%
            </Typography>
            <Typography>
              Throughput: 150 items/hour
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Kiosk; 