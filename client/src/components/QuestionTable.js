import axios from 'axios';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal'; 
import EditModal from './EditModal';
import { Table, TableBody, TableCell, TableContainer, TableRow, Collapse, Box, IconButton, FormControlLabel, Switch } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionTable = ({ questions, onUpdate, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [editText, setEditText] = useState('');
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [open, setOpen] = useState({}); // State to manage which rows are expanded

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

    const handleRowToggle = (id) => {
        setOpen((prev) => ({ ...prev, [id]: !prev[id] })); // Toggle the open state for the row
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableBody>
                        {questions
                            .filter((question) => question.isAlive)
                            .map((question) => (
                                <React.Fragment key={question.id}>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton aria-label="expand row" size="small" onClick={() => handleRowToggle(question.id)}>
                                                {open[question.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{question.text}</TableCell>
                                        <TableCell style={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={question.isActive}
                                                        onChange={() => handleToggle(question.id)}
                                                        color="primary"
                                                    />
                                                }
                                                label={
                                                    <span style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '80px', // Set fixed width for both states
                                                        textAlign: 'center',
                                                        boxSizing: 'border-box' // Include padding/border in width
                                                    }}>
                                                        {question.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                }
                                                labelPlacement="end"
                                            />
                                            <div style={{ marginLeft: 'auto' }}>
                                                <IconButton onClick={() => handleEditClick(question)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteClick(question.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                            <Collapse in={open[question.id]} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <p><strong>Created At:</strong> {question.created_at || 'N/A'}</p>
                                                    <p><strong>Updated At:</strong> {question.updated_at || 'N/A'}</p>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
