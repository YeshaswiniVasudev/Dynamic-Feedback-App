// LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/admin-panel"); // Route to admin dashboard
  };

  const handleUserClick = () => {
    navigate("/User-Page");
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      maxWidth={false} // Remove default maxWidth
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3E8D3",
        padding: 0, // Remove padding
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the App
      </Typography>
      <Box>
        <Button
          variant="contained"
          onClick={handleAdminClick}
          sx={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#90A955", // Set custom background color
            color: "#000", // Set custom text color if needed
            "&:hover": {
              backgroundColor: "#4F772D", // Optional: set a hover color
            },
          }}
        >
          Admin
        </Button>
        <Button
          variant="contained"
          onClick={handleUserClick}
          sx={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#90A955", // Set custom background color
            color: "#000", // Set custom text color if needed
            "&:hover": {
              backgroundColor: "#4F772D", // Optional: set a hover color
            },
          }}
        >
          User
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
