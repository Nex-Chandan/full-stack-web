import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';

const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret';

export default (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

