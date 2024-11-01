// src/components/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';

const QuestionForm = ({ onAdd }) => {
    const [questionText, setQuestionText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/questions', { text: questionText });
            onAdd(response.data); // Pass the newly added question to parent component
            setQuestionText(''); // Clear input field
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
 <Box
    display="flex"
    alignItems="center"
    padding="10px"
       sx={{ width: '100%' }} // Add equal padding on left and right sides
>
    <TextField
        variant="outlined"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter your question"
        required
        sx={{
            flex: 0.8, // Allow the TextField to take available width
            marginRight: 2, // Space to the right of the input
            '& .MuiInputBase-root': {
                height: '40px', // Set the height for input
                backgroundColor: 'white', // White background
                borderRadius: '8px', // Curved edges
                border: 'none', // No border
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Remove the default outline
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Remove border on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Remove border when focused
            },
        }}
    />
    <Button
    type="submit"
    variant="contained"
    sx={{
        flex: 0.15,
        height: '40px', // Set the same height as the TextField
        marginLeft: 1,
        borderRadius: '8px',
        backgroundColor: '#5DBB63', // Custom green color
        '&:hover': {
            backgroundColor: '#7DDBB5', // A darker shade for hover effect (optional)
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
