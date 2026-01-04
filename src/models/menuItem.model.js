const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide item name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['appetizer', 'main-course', 'dessert', 'beverage', 'side-dish']
  },
  image: {
    type: String,
    default: 'default-food.jpg'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  ingredients: [{
    type: String
  }],
  isVegetarian: {
    type: Boolean,
    default: false
  },
  spicyLevel: {
    type: String,
    enum: ['none', 'mild', 'medium', 'hot', 'extra-hot'],
    default: 'none'
  }
}, {
  timestamps: true
});

menuItemSchema.index({ category: 1, isAvailable: 1 });
module.exports = mongoose.model('MenuItem', menuItemSchema);