const express = require('express');
const router = express.Router();
const Intern = require('../models/applicant');
const Admin = require('../models/admin');

// Dummy login (replace with your logic)
router.post('/login/admin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({ message: 'Login successful', user: admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login/intern', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Attempt: ", email);

  try {
    const intern = await Intern.findOne({ email });
    console.log("Login Attempt: ", email);

    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    if (intern.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({ message: 'Login successful', user: intern });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all interns
router.get('/applicants', async (req, res) => {
  try {
    const interns = await Intern.find();
    res.json(interns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interns' });
  }
});

module.exports = router;