import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret';

// Removed admin login - public access

router.get('/submissions', async (req, res) => {
  const orders = await Order.find().sort({ submittedAt: -1 });
  res.json(orders);
});

router.get('/transactions', async (req, res) => {
  const orders = await Order.find().sort({ submittedAt: -1 }).lean();
  const transactions = orders.map(o => ({
    id: `#TXN${String(o.id).padStart(6, '0')}`,
    name: o.name,
    email: o.email,
    phone: o.phone,
    amount: o.amount,
    status: o.status,
    address: o.address,
    items: o.items,
    submittedAt: o.submittedAt
  }));
  res.json(transactions);
});

export default router;

