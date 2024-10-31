import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
import axios from 'axios';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]); // State to hold the list of questions

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions'); // Fetch questions from API
            console.log('Fetched questions:', response.data); // Log the fetched questions
            setQuestions(response.data); // Update state with the retrieved questions
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

   

    const handleAddQuestion = (newQuestion) => {
        // Create an Intl.DateTimeFormat instance to match the server format
        const formatter = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    
        // Format the current date
        const currentTimestamp = formatter.format(new Date());
    
        const enhancedQuestion = {
            ...newQuestion,
            isActive: true, // default value
            isAlive: true,  // default value
            created_at: currentTimestamp, // set formatted current timestamp
            updated_at: currentTimestamp, // set formatted current timestamp
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
                question.id === id
                    ? { ...question, text: updatedText, updated_at: currentTimestamp } // update the timestamp here
                    : question
            )
        );
    };

    const onDelete = (id) => {
        // Update local state to remove the deleted question
        setQuestions((prevQuestions) => prevQuestions.filter(question => question.id !== id));
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/${id}`); // Send delete request to the server
            onDelete(id); // Call onDelete to update state
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleToggleActive = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/questions/toggle/${id}`); // Toggle the active state
            const newStatus = response.data.isActive; // Get the new status
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.id === id ? { ...question, isActive: newStatus } : question // Update the specific question's status
                )
            );
        } catch (error) {
            console.error('Error toggling active state:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchQuestions(); // Fetch questions when the component mounts
    }, []); // Empty dependency array to run once

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <QuestionForm onAdd={handleAddQuestion} />
            <QuestionTable questions={questions} 
            onUpdate={handleUpdateQuestion} 
            onDelete={handleDeleteQuestion} 
            onToggle={handleToggleActive}/>
        </div>
    );
};

export default AdminDashboard;
