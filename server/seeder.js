const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

dotenv.config();

const importData = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      throw new Error('Cannot seed products because MongoDB is unavailable');
    }
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Data import error:', error.message);
    process.exit(1);
  }
};

importData();
