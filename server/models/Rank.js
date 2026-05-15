const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
  rank_name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration_days: {
    type: Number,
    required: true,
    default: 30
  },
  perk_description: {
    type: String,
    default: ''
  },
  badge_color: {
    type: String,
    default: '#FF6B35'
  },
  image_url: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Rank', rankSchema);