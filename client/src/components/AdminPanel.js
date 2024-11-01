import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import FeedbackTable from './ViewFeedbacks';
import { Box, Button, ButtonGroup, Container, Paper } from '@mui/material';

const AdminPanel = () => {
    const [view, setView] = useState('questions'); // Track current view
    useEffect(() => {
        // Set the gradient background for the whole page
        document.body.style.margin = 0; // Remove default margin
        document.body.style.height = '100vh'; // Ensure body takes full height
        document.body.style.background = '#D3E8D3';
       
    }, []);

    return (
        <Container
            maxWidth="md"
            sx={{
                padding: 0,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box textAlign="center" mt={4} mb={3}>
                {/* Toggle Buttons */}
                <ButtonGroup variant="contained" color="primary" spacing={1}>
                    <Button
                        onClick={() => setView('questions')}
                        sx={{
                            color: view === 'questions' ? '#FFFFFF' : '#000000', // Active button text color
                            backgroundColor: view === 'questions' ? '#90A955' : '#FFFFFF', // Change background color when active
                            '&:hover': {
                                backgroundColor: view === 'questions' ? '#4F772D' : '#e0e0e0', // Change hover color
                            },
                        }}
                    >
                        Questions
                    </Button>
                    <Button
                        onClick={() => setView('feedbacks')}
                        sx={{
                            color: view === 'feedbacks' ? '#FFFFFF' : '#000000', // Active button text color
                            backgroundColor: view === 'feedbacks' ? '#90A955' : '#FFFFFF', // Change background color when active
                            '&:hover': {
                                backgroundColor: view === 'feedbacks' ? '#4F772D' : '#e0e0e0', // Change hover color
                            },
                        }}
                    >
                        Feedback
                    </Button>
                </ButtonGroup>
            </Box>

            {/* Common Wrapper for Consistent Layout */}
            <Paper
                elevation={3}
                sx={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    overflowY: 'auto',
                    marginTop: 2,
                    padding: 3,
                }}
            >
                <Box mb={3}>
                    {/* Conditionally Render AdminDashboard or FeedbackTable */}
                    {view === 'questions' && <AdminDashboard />}
                    {view === 'feedbacks' && <FeedbackTable />}
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminPanel;
