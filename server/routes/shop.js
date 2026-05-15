const express = require('express');
const CoinPackage = require('../models/CoinPackage');
const Rank = require('../models/Rank');

const router = express.Router();

router.get('/coins', async (req, res) => {
  try {
    const coins = await CoinPackage.find({ status: 'active' }).sort({ price: 1 });
    res.json(coins);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/ranks', async (req, res) => {
  try {
    const ranks = await Rank.find({ status: 'active' }).sort({ price: 1 });
    res.json(ranks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;