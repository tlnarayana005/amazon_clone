const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const demoProducts = require('../data/products');

const router = express.Router();

const demoCatalog = demoProducts.map((product, index) => ({
  _id: `demo-${index + 1}`,
  ...product,
}));

router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(demoCatalog);
  }

  try {
    const products = await Product.find({});
    res.json(products.length ? products : demoCatalog);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const demoProduct = demoCatalog.find((product) => product._id === req.params.id);
    if (!demoProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(demoProduct);
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch product' });
  }
});

module.exports = router;
