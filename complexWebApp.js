/* 
Filename: complexWebApp.js
Description: A sophisticated and elaborate web application that demonstrates various functionalities and features.
*/

// Importing required libraries
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');
const nodemailer = require('nodemailer');

// Initializing express server
const app = express();
app.use(bodyParser.json());

// Global variables
let users = []; // User data
let isLoggedIn = false; // User login status

// Custom middleware to check user authentication
const authenticateUser = (req, res, next) => {
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('User not authenticated');
  }
};

/* --------------- Routes --------------- */

// User registration route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    res.status(409).send('Username already exists');
  } else {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).send('Error occurred while hashing password');
      } else {
        const newUser = { username, password: hashedPassword };
        users.push(newUser);
        res.status(201).send('User registered successfully');
      }
    });
  }
});

// User login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check if the user exists
  const user = users.find(user => user.username === username);
  if (!user) {
    res.status(401).send('Invalid username or password');
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send('Error occurred while comparing passwords');
      } else if (!result) {
        res.status(401).send('Invalid username or password');
      } else {
        isLoggedIn = true;
        res.status(200).send('User logged in successfully');
      }
    });
  }
});

// Protected route (requires authentication)
app.get('/protected', authenticateUser, (req, res) => {
  res.status(200).send('This is a protected route');
});

// File upload route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.post('/upload', authenticateUser, upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully');
});

// Email sending route
app.post('/sendEmail', authenticateUser, (req, res) => {
  const { recipient, subject, message } = req.body;
  
  // Configure transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });
  
  // Email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };
  
  // Send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send('Error occurred while sending email');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});

// Handle 404 error
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Starting the server
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});