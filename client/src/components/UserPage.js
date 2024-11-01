import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState({});
  const [name, setName] = useState(""); // State for user name
  const [email, setEmail] = useState(""); // State for user email

  useEffect(() => {
    // Fetch questions from the backend API
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
      const userResponse = await axios.post("http://localhost:5000/api/users", { name, email });
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
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </label>
        </div>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: "20px" }}>
            <label>{question.text}</label>
            <StarRating
              rating={ratings[question.id] || 0}
              onRatingChange={(rating) =>
                handleRatingChange(question.id, rating)
              }
            />
          </div>
        ))}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
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
