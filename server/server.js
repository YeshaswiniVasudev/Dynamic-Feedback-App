// server.js
const express = require('express');
const db = require('./db'); // Import the MySQL connection
const questionRoutes = require('./routes/questionRoutes');
const cors = require('cors'); 



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Enable cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/questions', questionRoutes);


// Connect to MySQL and start the server
db.connect((err) => {
    if (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit the app if the database connection fails
    } else {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
});

// Example Route
app.get('/', (req, res) => {
    res.send('Server is running');
});
