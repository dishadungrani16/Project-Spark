import { Box, Typography, Paper, Grid, Button } from '@mui/material';

function Missions() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Daily Missions & Skill Boosters
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Daily Mission
            </Typography>
            <Typography gutterBottom>
              Complete 100 accurate picks with zero errors
            </Typography>
            <Button variant="contained" color="primary">
              Start Mission
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Skill Booster
            </Typography>
            <Typography gutterBottom>
              Advanced Picking Techniques
            </Typography>
            <Button variant="contained" color="secondary">
              Watch Tutorial
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Missions; 