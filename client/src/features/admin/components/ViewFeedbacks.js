import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

const ViewFeedbacks = () => {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users. Please try again later.");
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch feedbacks from the API
  const fetchFeedbacks = async (userId) => {
    setLoadingFeedbacks(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL+`/api/feedback/${userId}`
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setError("Error fetching feedbacks. Please try again later.");
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  // Handle user click to open feedback modal
  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchFeedbacks(user.id);
    setOpenModal(true);
  };

  // Close the modal and reset feedbacks
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setFeedbacks([]);
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ width: "80%", maxWidth: 1000 }}
      >
        <Typography variant="h4" gutterBottom>
          Feedbacks
        </Typography>

        {loadingUsers ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : users.length === 0 ? (
          <Typography>No users found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ width: "100%", mb: 0 }}>
            <Table>
              <TableHead
                sx={{ p: 2, backgroundColor: "#f5f5f5", alignItems: "center" }}
              >
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    User ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={() => handleUserClick(user)}
                    sx={{ cursor: "pointer", alignItems: "center" }}
                  >
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{selectedUser?.name}</DialogTitle>
          <DialogContent>
            {loadingFeedbacks ? (
              <CircularProgress />
            ) : feedbacks.length === 0 ? (
              <Typography>No feedback available for this user.</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feedbacks.map((feedback) => (
                      <TableRow key={feedback.questionId}>
                        <TableCell>{feedback.questionText}</TableCell>
                        <TableCell>
                          <Rating
                            name="read-only"
                            value={feedback.rating}
                            precision={0.5}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ViewFeedbacks;
