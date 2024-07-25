import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').optional().isString(),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'User creation failed' });
    }
  }
);

router.get('/profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const userId = (decoded as any).userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

export default router;
