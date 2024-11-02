import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          sx={{
            color: "#FF5733",
            border: "2px solid transparent",
            "&:hover": {
              border: "2px solid #FF5733",
              color: "#C74429",
              backgroundColor: "rgba(255, 87, 51, 0.1)",
            },
          }}
        >
          Yes, Delete
        </Button>
        <Button
          onClick={onCancel}
          sx={{
            color: "#4F772D",
            border: "2px solid transparent",
            "&:hover": {
              border: "2px solid #4F772D",
              backgroundColor: "rgba(79, 119, 45, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
