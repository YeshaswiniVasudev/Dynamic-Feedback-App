// src/components/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';

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
            <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question"
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default QuestionForm;
