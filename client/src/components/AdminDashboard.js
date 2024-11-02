import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionTable from "./QuestionTable";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const currentTimestamp = formatter.format(new Date());
    const enhancedQuestion = {
      ...newQuestion,
      isActive: true,
      isAlive: true,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    };
    setQuestions((prevQuestions) => [...prevQuestions, enhancedQuestion]);
  };

  const handleUpdateQuestion = (id, updatedText) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const currentTimestamp = formatter.format(new Date());
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, text: updatedText, updated_at: currentTimestamp }
          : question
      )
    );
  };

  const onDelete = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/questions/toggle/${id}`
      );
      const newStatus = response.data.isActive;
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, isActive: newStatus } : question
        )
      );
    } catch (error) {
      console.error("Error toggling active state:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      minHeight="100vh"
      sx={{
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Paper elevation={0} sx={{ width: "100%", padding: 0 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Tahoma", sans-serif',
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          Feedback Form
        </Typography>

        <Box
          sx={{
            backgroundColor: "grey.200",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px", // Space between title and form
          }}
        >
          <QuestionForm onAdd={handleAddQuestion} />
        </Box>

        <Box
          sx={{
            backgroundColor: "grey.200",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <QuestionTable
            questions={questions}
            onUpdate={handleUpdateQuestion}
            onDelete={handleDeleteQuestion}
            onToggle={handleToggleActive}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
