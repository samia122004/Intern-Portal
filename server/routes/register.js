const express = require('express');
const router = express.Router();
const Intern = require('../models/applicant');

// Register route for Intern (without password hashing)

function isPasswordValid(password) {
  const regex = /^(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
}


router.post('/register', async (req, res) => {
  const { name, email, phone, city, password } = req.body;

  if (!name || !email || !phone || !city || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

    // Password validation
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      message:
        'Password must be max 8 characters',
    });
  }

  try {
    const existing = await Intern.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newIntern = new Intern({ name, email, phone, city, password });
    await newIntern.save();

    res.status(201).json({ message: 'Intern registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
