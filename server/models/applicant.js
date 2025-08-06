const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("applicant", applicantSchema, 'applicants');