import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const order = new Order({
      id: Date.now(),
      ...req.body,
      submittedAt: new Date(),
      status: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});



export default router;

