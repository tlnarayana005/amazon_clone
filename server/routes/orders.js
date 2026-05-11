const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const demoOrders = [];

router.post('/', protect, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  if (mongoose.connection.readyState !== 1) {
    const demoOrder = {
      _id: `demo-order-${Date.now()}`,
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false,
      createdAt: new Date().toISOString(),
    };
    demoOrders.unshift(demoOrder);
    return res.status(201).json(demoOrder);
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create order' });
  }
});

router.get('/', protect, async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(demoOrders.filter((order) => order.user === req.user._id));
  }

  try {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch orders' });
  }
});

module.exports = router;
