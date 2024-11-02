import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const ThankYouPage = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <IconButton
        onClick={() => (window.location.href = "/")}
        sx={{ color: "#4F772D", position: "absolute", top: 16, left: 16 }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: '"Tahoma", sans-serif' }}
      >
        Thank You for Your Feedback!
      </Typography>
      <Typography variant="body1" gutterBottom>
        We appreciate your input. Would you like to submit another response?
      </Typography>
      <Button
        variant="contained"
        sx={{ borderRadius: "8px", mt: 2, backgroundColor: "#4F772D" }}
        onClick={() => (window.location.href = "/User-Page")}
      >
        Submit Another Response
      </Button>
    </Box>
  );
};

export default ThankYouPage;
