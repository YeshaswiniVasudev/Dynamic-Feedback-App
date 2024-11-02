// src/components/QuestionForm.js
import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";

const QuestionForm = ({ onAdd }) => {
  const [questionText, setQuestionText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/questions", {
        text: questionText,
      });
      onAdd(response.data);
      setQuestionText("");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        alignItems="center"
        padding="10px"
        sx={{ width: "100%" }}
      >
        <TextField
          variant="outlined"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question"
          required
          sx={{
            flex: 0.8,
            marginRight: 2,
            "& .MuiInputBase-root": {
              height: "40px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            flex: 0.15,
            height: "40px",
            marginLeft: 1,
            borderRadius: "8px",
            backgroundColor: "#4F772D",
            "&:hover": {
              backgroundColor: "#90A955",
            },
          }}
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

export default QuestionForm;
