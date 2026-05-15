const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const CoinPackage = require('../models/CoinPackage');
const Rank = require('../models/Rank');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/auth/seed', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = new Admin({
      username: 'admin',
      password: 'admin123'
    });
    await admin.save();

    const defaultCoins = [
      { package_name: '15600 Coins (LIFESTEAL)', coin_amount: 15600, price: 12.20, description: 'A massive bundle of 15,600 coins to spend in the LifeSteal coinshop.', gamemode: 'LIFESTEAL', status: 'active' },
      { package_name: '7800 Coins (LIFESTEAL)', coin_amount: 7800, price: 6.50, description: '7,800 coins for your LifeSteal adventures.', gamemode: 'LIFESTEAL', status: 'active' },
      { package_name: '5660 Coins (LIFESTEAL)', coin_amount: 5660, price: 4.60, description: 'Boost your coin balance with 5,660 coins.', gamemode: 'LIFESTEAL', status: 'active' },
      { package_name: '2800 Coins (LIFESTEAL)', coin_amount: 2800, price: 2.50, description: 'A quick boost of 2,800 coins.', gamemode: 'LIFESTEAL', status: 'active' }
    ];

    const defaultRanks = [
      { rank_name: 'VIP', price: 4.99, duration_days: 30, perk_description: 'Get exclusive perks, commands, and a special prefix in-game!', badge_color: '#4ade80', status: 'active' },
      { rank_name: 'Elite', price: 9.99, duration_days: 30, perk_description: 'Includes all VIP perks plus advanced commands and exclusive access!', badge_color: '#f59e0b', status: 'active' }
    ];

    await CoinPackage.insertMany(defaultCoins);
    await Rank.insertMany(defaultRanks);

    res.json({ message: 'Seed completed successfully', username: 'admin', password: 'admin123' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/coins', auth, async (req, res) => {
  try {
    const coins = await CoinPackage.find().sort({ createdAt: -1 });
    res.json(coins);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/coins', auth, async (req, res) => {
  try {
    const coin = new CoinPackage(req.body);
    await coin.save();
    res.status(201).json(coin);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/coins/:id', auth, async (req, res) => {
  try {
    const coin = await CoinPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!coin) return res.status(404).json({ error: 'Package not found' });
    res.json(coin);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/coins/:id', auth, async (req, res) => {
  try {
    const coin = await CoinPackage.findByIdAndDelete(req.params.id);
    if (!coin) return res.status(404).json({ error: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/ranks', auth, async (req, res) => {
  try {
    const ranks = await Rank.find().sort({ createdAt: -1 });
    res.json(ranks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/ranks', auth, async (req, res) => {
  try {
    const rank = new Rank(req.body);
    await rank.save();
    res.status(201).json(rank);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/ranks/:id', auth, async (req, res) => {
  try {
    const rank = await Rank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!rank) return res.status(404).json({ error: 'Rank not found' });
    res.json(rank);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/ranks/:id', auth, async (req, res) => {
  try {
    const rank = await Rank.findByIdAndDelete(req.params.id);
    if (!rank) return res.status(404).json({ error: 'Rank not found' });
    res.json({ message: 'Rank deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;