import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const UserPage = () => {
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch questions from the backend API

    document.body.style.margin = 0; // Remove default margin
        document.body.style.height = '100vh'; // Ensure body takes full height
        document.body.style.background = '#D3E8D3';
    axios
      .get("http://localhost:5000/api/questions/feedbackQuestions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleRatingChange = (questionId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionId]: rating,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userId;
    try {
      const userResponse = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
      });
      userId = userResponse.data.userId;
    } catch (error) {
      console.error("Error inserting user:", error);
      return;
    }

    const feedback = questions.map((q) => ({
      questionId: q.id,
      rating: ratings[q.id] || 0,
    }));

    try {
      await axios.post("http://localhost:5000/api/feedback", { feedback, userId });
      alert("Feedback submitted successfully!");

      setName("");
      setEmail("");
      setRatings({});
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Feedback Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Grid>
            {questions.map((question) => (
              <Grid item key={question.id}>
                <Typography variant="h6">{question.text}</Typography>
                <StarRating
                  rating={ratings[question.id] || 0}
                  onRatingChange={(rating) => handleRatingChange(question.id, rating)}
                />
              </Grid>
            ))}
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Feedback
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
            fontSize: "24px", // Increase star size for better visibility
            marginRight: "5px", // Add space between stars
          }}
          onClick={() => onRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default UserPage;
