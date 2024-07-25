import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  }
);

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken((user as any).userId);
    res.json({ accessToken: newAccessToken });
  });
});

export default router;
