// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes'); // Import the routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Use question routes
app.use('/api/questions', questionRoutes); // Set the base URL for questions

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
