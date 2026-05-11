const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const DEMO_USER_ID = 'demo-user';
const getJwtSecret = () => process.env.JWT_SECRET || 'demo-amazon-clone-secret';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, getJwtSecret());

      if (mongoose.connection.readyState !== 1) {
        if (decoded.id !== DEMO_USER_ID) {
          return res.status(401).json({ message: 'Demo mode only accepts the demo login' });
        }
        req.user = {
          _id: DEMO_USER_ID,
          name: 'Demo Shopper',
          email: 'demo@amazon.test',
        };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
