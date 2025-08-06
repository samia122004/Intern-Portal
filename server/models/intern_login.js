const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
});

module.exports = mongoose.model('Intern', internSchema);