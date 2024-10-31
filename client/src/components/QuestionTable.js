import axios from 'axios';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal'; 
import EditModal from './EditModal';

const QuestionTable = ({ questions, onUpdate, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [editText, setEditText] = useState('');
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    const handleEditClick = (question) => {
         setIsConfirmingDelete(false);
        setIsEditing(true);
        setEditQuestionId(question.id);
        setEditText(question.text);
       
        
    };
    const handleDeleteClick = (id) => {
        setIsEditing(false);
        setQuestionToDelete(id); // Set the question ID to delete
        setIsConfirmingDelete(true); // Show the confirmation modal
    };

    const confirmDelete = async () => {
        try {
            await onDelete(questionToDelete); // Call the delete function
            setIsConfirmingDelete(false); // Hide the modal after deletion
            setQuestionToDelete(null); // Clear the question ID
        } catch (error) {
            console.error('Error deleting question:', error.response ? error.response.data : error.message);
        }
    };

    const cancelDelete = () => {
        setIsConfirmingDelete(false); // Hide the modal without deleting
        setQuestionToDelete(null); // Clear the question ID
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/questions/${editQuestionId}`, { text: editText });
            onUpdate(editQuestionId, editText);
            setIsEditing(false);
            setEditQuestionId(null);
            setEditText('');
        } catch (error) {
            console.error('Error updating question:', error.response ? error.response.data : error.message);
        }
    };

    const handleToggle = async (id) => {
        try {
            await onToggle(id); // Call the onToggle prop function with the question ID
        } catch (error) {
            console.error('Error toggling active state:', error.response ? error.response.data : error.message);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditQuestionId(null);
        setEditText('');
    };

    

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Is Active</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions
                        .filter((question) => question.isAlive)
                        .map((question) => (
                            <tr key={question.id}>
                                <td>{question.id}</td>
                                <td>{question.text}</td>
                                <td>
                                <button onClick={() => handleToggle(question.id)}>
                                        {question.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                                <td>{question.created_at || 'N/A'}</td>
                                <td>{question.updated_at || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleEditClick(question)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(question.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>


<EditModal
                isOpen={isEditing}
                questionText={editText}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                onChange={setEditText}
            />


                <ConfirmationModal
                isOpen={isConfirmingDelete}
                    message="Are you sure you want to delete this question?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
          
        </div>
    );
};

export default QuestionTable;
