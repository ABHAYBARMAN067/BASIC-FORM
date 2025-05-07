const express = require("express");
const ConnectMongo = require("./DB");
const Users = require('./model');
const path = require('path');

require("dotenv").config();

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
ConnectMongo();

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/api/users", async (req, res) => {
  try {
    console.log('Received data:', req.body); // Debug log

    const { name, rollnumber, age, gender } = req.body;

    // Validate required fields
    if (!name || !rollnumber || !age || !gender) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    // Create new user
    const user = new Users({
      name,
      rollnumber: parseInt(rollnumber),
      age: parseInt(age),
      gender
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: user
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
