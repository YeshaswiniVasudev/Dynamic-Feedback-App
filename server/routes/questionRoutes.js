// server/routes/questionRoutes.js
const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM questions WHERE isAlive = ?', [true], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const formatter = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });

        const formattedResults = results.map((question) => ({
            ...question,
            created_at: question.created_at ? formatter.format(new Date(question.created_at)) : null,
            updated_at: question.updated_at ? formatter.format(new Date(question.updated_at)) : null
        }));

        res.json(formattedResults); // Send formatted results
    });
});




router.post('/', (req, res) => {
    const { text } = req.body;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Insert the new question with the correct column names
    db.query('INSERT INTO questions (text, isActive, isAlive, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', 
        [text, 1, 1, createdAt, updatedAt], // Set default values for isActive and isAlive
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const newQuestion = { 
                id: result.insertId, 
                text, 
                isActive: 1,  // Default value for isActive
                isAlive: 0,   // Default value for isAlive
                createdAt,
                updatedAt
            };
            res.status(201).json(newQuestion); // Respond with the newly created question
        }
    );
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const query = 'UPDATE questions SET text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND isAlive = TRUE';
    
    db.query(query, [text, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Question not found or has been deleted' });
        }
        res.status(200).json({ message: 'Question updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE questions SET isAlive = FALSE WHERE id = ? AND isAlive = TRUE';
    
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Question not found or has already been deleted' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    });
});

// Toggle isActive state
router.put('/toggle/:id', (req, res) => {
    const { id } = req.params;
    
    // First, get the current state of isActive
    db.query('SELECT isActive FROM questions WHERE id = ? AND isAlive = TRUE', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Question not found or has been deleted' });
        }

        const currentState = results[0].isActive;

        // Toggle the state
        const newState = !currentState;
        db.query('UPDATE questions SET isActive = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [newState, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Question active status updated successfully', isActive: newState });
        });
    });
});


module.exports = router;
