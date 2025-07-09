const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: String,
  description: String,
  endpoint: String,
  method: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('api', apiSchema);
