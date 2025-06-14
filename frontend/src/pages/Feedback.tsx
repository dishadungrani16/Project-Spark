import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Rating, Alert } from '@mui/material';

function Feedback() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, rating }),
      });
      if (response.ok) {
        setSubmitted(true);
        setMessage('');
        setRating(null);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Anonymous Feedback
      </Typography>
      {submitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for your feedback!
        </Alert>
      )}
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            How was your experience today?
          </Typography>
          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!message || !rating}
          >
            Submit Feedback
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Feedback; 