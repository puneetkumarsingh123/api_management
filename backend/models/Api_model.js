const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: String,
  description: String,
  endpoint: String,
  method: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },


  doc: { type: String, default: '' },

  hourlyLimit: { type: Number, default: 0 }, 

  usageCount: { type: Number, default: 0 },
  lastUsed: { type: Date },
  usageLog: [
    {
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('api', apiSchema);
