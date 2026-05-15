const mongoose = require('mongoose');

const coinPackageSchema = new mongoose.Schema({
  package_name: {
    type: String,
    required: true,
    trim: true
  },
  coin_amount: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: ''
  },
  gamemode: {
    type: String,
    default: 'LIFESTEAL'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('CoinPackage', coinPackageSchema);