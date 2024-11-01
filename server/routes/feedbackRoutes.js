const express = require('express');
const router = express.Router();
const db = require('../db'); 


router.post('/', (req, res) => {
    const { feedback, userId } = req.body; // Expecting userId to be passed

    // Insert feedback into Feedback table
    const feedbackQueries = feedback.map(({ questionId, rating }) => {
        return new Promise((resolve, reject) => {
            const feedbackQuery = 'INSERT INTO Feedback (questionId, userId, rating) VALUES (?, ?, ?)';
            db.query(feedbackQuery, [questionId, userId, rating], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
    Promise.all(feedbackQueries)
        .then(() => {
            res.status(200).json({ message: 'Feedback submitted successfully!' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT feedback.questionId, feedback.rating, questions.text AS questionText 
        FROM feedback 
        JOIN questions ON feedback.questionId = questions.id 
        WHERE feedback.userId = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
       
        res.json(results);
    });
});

module.exports = router;