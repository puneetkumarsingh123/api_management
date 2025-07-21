const rateLimit = require('express-rate-limit');

const testApiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 2, 
  message: "⏳ Too many API test requests. Please try again after a minute.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.id || req.ip 
});

module.exports = testApiLimiter;
