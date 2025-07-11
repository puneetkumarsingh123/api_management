const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({ ...req.body, password: hashedPass });
  await newUser.save();
  res.status(201).json("User registered");
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    return res.status(401).json("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Wrong password");
    return res.status(401).json("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { email: user.email, name: user.name } }); // return email & name
});


module.exports = router;
