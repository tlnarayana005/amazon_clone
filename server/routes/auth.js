const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

const demoUser = {
  _id: 'demo-user',
  name: 'Demo Shopper',
  email: 'demo@amazon.test',
  password: 'password123',
};

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'demo-amazon-clone-secret';
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'MongoDB is required to create accounts' });
  }

  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (mongoose.connection.readyState !== 1) {
    if (email === demoUser.email && password === demoUser.password) {
      return res.json({
        _id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        token: generateToken(demoUser._id),
      });
    }
    return res.status(401).json({
      message: 'Use demo@amazon.test / password123 to sign in without MongoDB',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
