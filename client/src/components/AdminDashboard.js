import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Box, Paper, Typography, InputBase } from '@mui/material';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('Form Title');
    const [isEditing, setIsEditing] = useState(false);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAddQuestion = (newQuestion) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
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
        const formatter = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
        const currentTimestamp = formatter.format(new Date());
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === id ? { ...question, text: updatedText, updated_at: currentTimestamp } : question
            )
        );
    };

    const onDelete = (id) => {
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/${id}`);
            onDelete(id);
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleToggleActive = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/questions/toggle/${id}`);
            const newStatus = response.data.isActive;
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.id === id ? { ...question, isActive: newStatus } : question
                )
            );
        } catch (error) {
            console.error('Error toggling active state:', error);
        }
    };

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                paddingTop: 4,
                background: 'linear-gradient(to bottom, #FFF4B3, #D3E8D3, #FFFFFF, #D3E8D3, #B2E5FF)',
            }}
        >
            <Container maxWidth="md">
                <Paper elevation={3}>
                    <Box p={4}>
                        {/* Title Section */}
                        <Box
                            sx={{
                                backgroundColor: 'grey.200',
                                padding: '10px',
                                borderRadius: '5px',
                                marginBottom: '20px',
                                textAlign: 'left'
                            }}
                        >
                            {isEditing ? (
                                <InputBase
                                    value={title}
                                    onChange={handleTitleChange}
                                    onBlur={handleTitleBlur}
                                    autoFocus
                                    fullWidth
                                    sx={{ fontSize: '24px' }}
                                />
                            ) : (
                                <Typography
                                    variant="h4"
                                    onClick={handleTitleClick}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {title}
                                </Typography>
                            )}
                        </Box>

                        {/* Question Form Section */}
                        <Box
                            sx={{
                                backgroundColor: 'grey.200',
                                padding: '10px',
                                borderRadius: '5px',
                                marginBottom: '20px', // Space between title and form
                            }}
                        >
                            <QuestionForm onAdd={handleAddQuestion} />
                        </Box>

                        {/* Question Table Section */}
                        <Box
                            sx={{
                                backgroundColor: 'grey.200',
                                padding: '10px',
                                borderRadius: '5px',
                                marginBottom: '20px', // Space between title and form
                            }}
                        >
                            <QuestionTable
                            questions={questions}
                            onUpdate={handleUpdateQuestion}
                            onDelete={handleDeleteQuestion}
                            onToggle={handleToggleActive}
                        />
                        </Box>
                        
                        
                        <Box mt={3}>
                            <Link to="/view-feedbacks">View Feedbacks</Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
