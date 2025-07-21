
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Api = require('../models/Api_model');
const authenticateUser = require('../middleware/auth');
const testApiLimiter = require('../middleware/rateLimit');

router.all('/:id/proxy', authenticateUser, async (req, res) => {
  try {
    const apiDoc = await Api.findOne({ _id: req.params.id });
    if (!apiDoc) return res.status(404).json("API not found or unauthorized");

    if (apiDoc.hourlyLimit > 0) {
      const now = new Date();
      const hourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0);
      const usageThisHour = apiDoc.usageLog.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= hourStart;
      }).length;
      if (usageThisHour >= apiDoc.hourlyLimit) {
        return res.status(429).json({ message: `Hourly usage limit (${apiDoc.hourlyLimit}) reached for this API.` });
      }
    }

    const axiosConfig = {
      method: apiDoc.method,
      url: apiDoc.endpoint,
      headers: { ...req.headers, host: undefined },
      data: req.body,
      params: req.query
    };
    const apiRes = await axios(axiosConfig);

    apiDoc.usageCount += 1;
    apiDoc.lastUsed = new Date();
    apiDoc.usageLog.push({ date: new Date() });
    await apiDoc.save();

    res.status(apiRes.status).send(apiRes.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).send(err.response.data);
    } else {
      res.status(500).json("Error proxying request");
    }
  }
});

router.get('/', authenticateUser, async (req, res) => {
  try {
    const apis = await Api.find({ createdBy: req.user._id });
    res.json(apis);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.post('/', authenticateUser, async (req, res) => {
  try {
    const newApi = new Api({
      name: req.body.name,
      description: req.body.description,
      endpoint: req.body.endpoint,
      method: req.body.method,
      hourlyLimit: req.body.hourlyLimit || 0,
      createdBy: req.user._id
    });
    const savedApi = await newApi.save();
    res.json(savedApi);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (typeof req.body.hourlyLimit !== 'undefined') {
      updateData.hourlyLimit = req.body.hourlyLimit;
    }
    const updated = await Api.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json("API not found or unauthorized");
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.post('/:id/log', authenticateUser, async (req, res) => {
  try {
    const apiDoc = await Api.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!apiDoc) return res.status(404).json("API not found or unauthorized");

    if (apiDoc.hourlyLimit > 0) {
      const now = new Date();
      const hourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0);
      const usageThisHour = apiDoc.usageLog.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= hourStart;
      }).length;
      if (usageThisHour >= apiDoc.hourlyLimit) {
        return res.status(429).json({ message: `Hourly usage limit (${apiDoc.hourlyLimit}) reached for this API.` });
      }
    }

    apiDoc.usageCount += 1;
    apiDoc.lastUsed = new Date();
    apiDoc.usageLog.push({ date: new Date() });

    await apiDoc.save();
    res.json({ message: "Usage logged" });
  } catch (err) {
    res.status(500).json("Error logging usage");
  }
});

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const deleted = await Api.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!deleted) return res.status(404).json("API not found or unauthorized");
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
