// server/routes/questionRoutes.js
const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// GET all active questions
router.get('/', (req, res) => {
    db.query('SELECT * FROM questions WHERE isAlive = ?', [true], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // This will only include questions with isAlive = true
    });
});


router.post('/', (req, res) => {
    const { text } = req.body;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    
    db.query('INSERT INTO questions (text, createdAt, updatedAt, isAlive) VALUES (?, ?, ?, ?)', [text, createdAt, updatedAt, true], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const newQuestion = { 
            id: result.insertId, 
            text, 
            isActive: true,  // default value for isActive
            isAlive: true,   // default value for isAlive
            createdAt,
            updatedAt
        };
        res.status(201).json(newQuestion); // Respond with the newly created question
    });
});



module.exports = router;
