const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;

  const userCheckQuery = "SELECT id FROM Users WHERE email = ?";
  db.query(userCheckQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res
        .status(409)
        .json({ message: "You have already submitted feedback." });
    }

    const userQuery =
      "INSERT INTO Users (name, email, createdAt) VALUES (?, ?, NOW())";
    db.query(userQuery, [name, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const userId = result.insertId;
      res.status(201).json({ userId });
    });
  });
});

router.get("/", (req, res) => {
  const query = "SELECT id, name, email FROM Users";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
