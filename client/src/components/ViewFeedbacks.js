import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    CircularProgress, // Loading spinner
} from '@mui/material';

const ViewFeedbacks = () => {
    const [users, setUsers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(true); // Loading state for users
    const [loadingFeedbacks, setLoadingFeedbacks] = useState(false); // Loading state for feedbacks
    const [error, setError] = useState(null); // Error state

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
        } finally {
            setLoadingUsers(false); // Set loading to false after fetching
        }
    };

    const fetchFeedbacks = async (userId) => {
        setLoadingFeedbacks(true); // Set loading to true for feedbacks
        try {
            const response = await axios.get(`http://localhost:5000/api/feedback/${userId}`);
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            setError('Error fetching feedbacks. Please try again later.');
        } finally {
            setLoadingFeedbacks(false); // Set loading to false after fetching
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        fetchFeedbacks(user.id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
        setFeedbacks([]);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <Box p={3} display="flex" flexDirection="column" alignItems="center" sx={{ width: '80%', maxWidth: 1000 }}>
                <Typography variant="h4" gutterBottom>
                    Feedbacks
                </Typography>

                {loadingUsers ? ( // Show loading spinner while fetching users
                    <CircularProgress />
                ) : error ? ( // Show error message if any
                    <Typography color="error">{error}</Typography>
                ) : users.length === 0 ? ( // Handle empty user list
                    <Typography>No users found.</Typography>
                ) : (
                    <TableContainer component={Paper} sx={{ width: '100%', mb: 0 }}>
                        <Typography variant="h6" sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                            Users
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow 
                                        key={user.id} 
                                        hover 
                                        onClick={() => handleUserClick(user)} 
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Modal for displaying feedback */}
                <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                    <DialogTitle>{selectedUser?.name}</DialogTitle>
                    <DialogContent>
                        {loadingFeedbacks ? ( // Show loading spinner while fetching feedbacks
                            <CircularProgress />
                        ) : feedbacks.length === 0 ? ( // Handle empty feedback list
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
