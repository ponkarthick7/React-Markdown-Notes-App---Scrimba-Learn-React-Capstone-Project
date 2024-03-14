const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Ensure uniqueness of the id field
    index: true // Index the id field for faster querying
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
