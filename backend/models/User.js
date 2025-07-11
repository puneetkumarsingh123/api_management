const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d/.test(v); // checks if there's at least one digit
      },
      message: 'Password must contain at least one number'
    }
  }
});

module.exports = mongoose.model('User', userSchema);
