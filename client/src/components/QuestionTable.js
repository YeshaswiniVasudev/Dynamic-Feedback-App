import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ConfirmationModal from "./ConfirmationModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Collapse,
  Box,
  IconButton,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const QuestionTable = ({ questions, onUpdate, onDelete, onToggle }) => {
  const [isEditingId, setIsEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [open, setOpen] = useState({}); // State to manage which rows are expanded
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditingId) {
      editInputRef.current?.focus(); // Focus the input when editing starts
    }
  }, [isEditingId]);

  const handleEditClick = (question) => {
    setIsConfirmingDelete(false);
    setIsEditingId(question.id);
    setEditText(question.text);
  };

  const handleDeleteClick = (id) => {
    setQuestionToDelete(id); // Set the question ID to delete
    setIsConfirmingDelete(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await onDelete(questionToDelete); // Call the delete function
      setIsConfirmingDelete(false); // Hide the modal after deletion
      setQuestionToDelete(null); // Clear the question ID
    } catch (error) {
      console.error(
        "Error deleting question:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false); // Hide the modal without deleting
    setQuestionToDelete(null); // Clear the question ID
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/questions/${isEditingId}`, {
        text: editText,
      });
      onUpdate(isEditingId, editText);
      setIsEditingId(null);
      setEditText("");
    } catch (error) {
      console.error(
        "Error updating question:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleToggle = async (id) => {
    try {
      await onToggle(id); // Call the onToggle prop function with the question ID
    } catch (error) {
      console.error(
        "Error toggling active state:",
        error.response ? error.response.data : error.message
      );
    }
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
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowToggle(question.id)}
                      >
                        {open[question.id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ width: "300px", position: "relative" }}>
                      <div style={{ position: "relative", height: "40px" }}>
                        {" "}
                        {/* Fixed height */}
                        {isEditingId === question.id ? (
                          <TextField
                            inputRef={editInputRef}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleSaveEdit} // Save on blur
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveEdit(); // Save on Enter
                              }
                            }}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 1, // Ensure it's above static text
                              backgroundColor: "white", // Set background color to white
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  border: "none", // Remove border
                                },
                                "&:hover fieldset": {
                                  border: "none", // Remove border on hover
                                },
                                "&.Mui-focused fieldset": {
                                  border: "none", // Remove border when focused
                                },
                              },
                            }}
                          />
                        ) : (
                            <span
                            style={{
                              display: "block",
                              width: "100%",
                              height: "auto", // Allow height to adjust to content
                              lineHeight: "normal", // Default line height
                              overflow: "visible", // Allow overflow
                              textOverflow: "clip", // Remove ellipsis
                              whiteSpace: "normal", // Allow text to wrap to the next line
                              zIndex: 0, // Ensure it stays below input
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          >
                            {question.text}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "200px",
                      }}
                    >
                      <div style={{ marginLeft: "auto" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={question.isActive}
                              onChange={() => handleToggle(question.id)}
                              color="primary"
                            />
                          }
                          label={
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "80px",
                                textAlign: "center",
                                boxSizing: "border-box",
                              }}
                            >
                              {question.isActive ? "Active" : "Inactive"}
                            </span>
                          }
                          labelPlacement="end"
                        />
                        <IconButton onClick={() => handleEditClick(question)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(question.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={5}
                    >
                      <Collapse
                        in={open[question.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <p>
                            <strong>Created At:</strong>{" "}
                            {question.created_at || "N/A"}
                          </p>
                          <p>
                            <strong>Updated At:</strong>{" "}
                            {question.updated_at || "N/A"}
                          </p>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

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
