const express = require('express');
const router = express.Router();
const Api = require('../models/ApiModel');

// Get all APIs
router.get('/', async (req, res) => {
  const apis = await Api.find();
  res.json(apis);
});

// Add new API
router.post('/', async (req, res) => {
  const newApi = new Api(req.body);
  const savedApi = await newApi.save();
  res.json(savedApi);
});

// Update API
router.put('/:id', async (req, res) => {
  const updated = await Api.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete API
router.delete('/:id', async (req, res) => {
  await Api.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
