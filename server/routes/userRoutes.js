const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();


router.post('/', (req, res) => {
    const { name, email } = req.body;

    // Insert user into Users table with createdAt timestamp
    const userQuery = 'INSERT INTO Users (name, email, createdAt) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
    db.query(userQuery, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const userId = result.insertId; // Get the inserted user's ID
        res.status(201).json({ userId }); // Return the user ID
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT id, name, email FROM Users'; // Adjust table name and columns as necessary

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;