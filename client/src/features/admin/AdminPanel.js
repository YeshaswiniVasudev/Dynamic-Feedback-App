//Admin Panel
// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import FeedbackTable from "./components/ViewFeedbacks";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AdminPanel = () => {
  // State to track the currently selected view (questions or feedback)
  const [view, setView] = useState("questions");
  const navigate = useNavigate();

  // Effect to set initial styles for the document body
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.height = "100vh";
    document.body.style.background = "#D3E8D3";
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Home button to navigate back to the main page */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: 16, left: 16, color: "#4F772D" }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>

      <Container
        maxWidth="md"
        sx={{
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Button group to switch between different views */}
        <Box display="flex" alignItems="center" mt={4} mb={3}>
          <Box flexGrow={1} display="flex" justifyContent="center">
            <ButtonGroup variant="contained" color="primary" spacing={1}>
              {/* Button to view questions */}
              <Button
                onClick={() => setView("questions")}
                sx={{
                  color: view === "questions" ? "#FFFFFF" : "#000000",
                  backgroundColor: view === "questions" ? "#4F772D" : "#FFFFFF",
                  "&:hover": {
                    backgroundColor:
                      view === "questions" ? "#90A955" : "#e0e0e0",
                  },
                }}
              >
                Questions
              </Button>
              {/* Button to view feedbacks */}
              <Button
                onClick={() => setView("feedbacks")}
                sx={{
                  color: view === "feedbacks" ? "#FFFFFF" : "#000000",
                  backgroundColor: view === "feedbacks" ? "#4F772D" : "#FFFFFF",
                  "&:hover": {
                    backgroundColor:
                      view === "feedbacks" ? "#90A955" : "#e0e0e0",
                  },
                }}
              >
                Feedback
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        {/* Main content area for displaying selected view */}
        <Paper
          elevation={3}
          sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflowY: "auto",
            marginTop: 2,
            padding: 3,
          }}
        >
          <Box mb={3}>
            {view === "questions" && <AdminDashboard />}
            {view === "feedbacks" && <FeedbackTable />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminPanel;
