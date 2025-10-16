const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect MongoDB (local example)
mongoose.connect('mongodb+srv://Archana:Archana%402408@cluster0.c0vysdx.mongodb.net/studentDB');
// Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  course: String
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// Serve login page at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle registration form
app.post('/register', async (req, res) => {
  const { name, email, password, course } = req.body;
  const student = new Student({ name, email, password, course });
  await student.save();
  res.send('Registration successful! <a href="/">Go to Login</a>');
});

// Handle login form
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email, password });
  if (user) {
    res.sendFile(path.join(__dirname, 'public', 'courses.html'));
  } else {
    res.send('Invalid credentials. <a href="/">Try again</a>');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
