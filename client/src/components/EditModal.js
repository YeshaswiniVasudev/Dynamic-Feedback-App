// EditQuestionModal.js
import React from 'react';

const EditQuestionModal = ({ isOpen, questionText, onSave, onCancel, onChange }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h3>Edit Question</h3>
            <input
                type="text"
                value={questionText}
                onChange={(e) => onChange(e.target.value)}
            />
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditQuestionModal;
