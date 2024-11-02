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
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.height = "100vh";
    document.body.style.background = "#D3E8D3";

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
      await axios.post("http://localhost:5000/api/feedback", {
        feedback,
        userId,
      });

      setName("");
      setEmail("");
      setRatings({});
      setErrorMessage(null);
      navigate('/thank-you');
    } catch (error) {
      setErrorMessage("Error submitting feedback. Please try again.");
    }
  };

  const handleCloseError = () => {
    setErrorMessage(null);
    setName("");
    setEmail("");
    setRatings({});
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
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
                    onRatingChange={(rating) =>
                      handleRatingChange(question.id, rating)
                    }
                  />
                </Grid>
              ))}
              <Grid item>
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
