// server.js
const express = require("express");
const db = require("./db"); // Import the MySQL connection
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
