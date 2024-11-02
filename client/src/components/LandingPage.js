// LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";

const ReflectiveText = styled("div")({
  position: "relative",
  display: "inline-block",
  color: "#000",
  WebkitBoxReflect:
    "below -50px linear-gradient(transparent, rgba(255, 255, 255, 0.1))",

  textShadow: "0 1px 1px rgba(255, 255, 255, 0.5)",
});

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/admin-panel");
  };

  const handleUserClick = () => {
    navigate("/User-Page");
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3E8D3",
        padding: 0,
      }}
    >
      <ReflectiveText>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: '"Tahoma", sans-serif' }}
        >
          Welcome to Your Feedback Hub!
        </Typography>
      </ReflectiveText>
      <Box>
        <Button
          variant="contained"
          onClick={handleAdminClick}
          sx={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#4F772D",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#4F772D",
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
            backgroundColor: "#4F772D",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#4F772D",
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
