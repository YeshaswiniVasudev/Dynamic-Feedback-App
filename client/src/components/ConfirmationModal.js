import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={onConfirm} color="secondary">
                    Yes, Delete
                </Button>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
