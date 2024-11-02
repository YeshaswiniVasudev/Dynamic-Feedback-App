import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";

const UserPage = () => {
  const [questions, setQuestions] = useState([]); // State to hold feedback questions
  const [ratings, setRatings] = useState({}); // State to store user ratings for questions
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState(""); // State for user's email

  const [errorMessage, setErrorMessage] = useState(null); // State to manage error messages
  const navigate = useNavigate(); // Hook for navigation

  // Set up the page style and fetch questions on component mount
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.height = "100vh";
    document.body.style.background = "#D3E8D3";

    axios
      .get("http://localhost:5000/api/questions/feedbackQuestions")
      .then((response) => {
        setQuestions(response.data); // Store fetched questions in state
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleRatingChange = (questionId, rating) => {
    // Update the rating for a specific question
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionId]: rating,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if all questions have ratings
    const allRated = questions.every(
      (question) => ratings[question.id] !== undefined
    );
    if (!allRated) {
      setErrorMessage("Please provide a rating for all questions.");
      return;
    }

    let userId;
    try {
      const userResponse = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
      });
      userId = userResponse.data.userId;
    } catch (error) {
      // Handle errors related to user creation
      if (error.response && error.response.status === 409) {
        setErrorMessage("You have already submitted feedback.");
      } else {
        setErrorMessage("Error inserting user. Please try again.");
      }
      return;
    }

    const feedback = questions.map((q) => ({
      questionId: q.id,
      rating: ratings[q.id] || 0,
    }));

    try {
      // Submit the feedback to the server
      await axios.post("http://localhost:5000/api/feedback", {
        feedback,
        userId,
      });

      // Reset state after successful submission
      setName("");
      setEmail("");
      setRatings({});
      setErrorMessage(null);
      navigate("/thank-you");
    } catch (error) {
      setErrorMessage("Error submitting feedback. Please try again.");
    }
  };

  const handleCloseError = () => {
    // Clear error message and reset input fields
    setErrorMessage(null);
    setName("");
    setEmail("");
    setRatings({});
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Home button to navigate back to the main page */}
      <IconButton
        onClick={() => (window.location.href = "/")}
        sx={{ position: "absolute", top: 0, left: 16, color: "#4F772D" }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontFamily: '"Tahoma", sans-serif' }}
          >
            Your Feedback Shapes Our Future
          </Typography>

          {/* Display error message if present */}
          {errorMessage && (
            <Alert
              severity="error"
              action={
                <IconButton color="inherit" onClick={handleCloseError}>
                  <CloseIcon />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
              {/* Input for user's name */}
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
                {/* Input for user's email */}
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
              {/* Render questions and associated star ratings */}
              {questions.map((question) => (
                <Grid item key={question.id}>
                  <Typography variant="h6">{question.text}</Typography>
                  <StarRating
                    rating={ratings[question.id] || 0}
                    onRatingChange={(rating) =>
                      handleRatingChange(question.id, rating)
                    }
                  />
                </Grid>
              ))}
              <Grid item>
                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    alignSelf: "flex-start",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    backgroundColor: "#4F772D",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#3B5B24",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

// StarRating component to allow users to provide ratings visually
const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= (hoveredStar || rating) ? "gold" : "gray",
            fontSize: "24px",
            marginRight: "5px",
          }}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default UserPage;
