import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();
const PORT=5000

import connectDB from './db.js';

await connectDB();

const ordersRoutes = await import('./routes/orders.js');
const adminRoutes = await import('./routes/admin.js');

const app = express();

// Middleware
app.use(cors({
  origin: '*', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/orders', ordersRoutes.default);
app.use('/api/admin', adminRoutes.default);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend API running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

