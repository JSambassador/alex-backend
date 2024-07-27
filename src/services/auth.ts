import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  id: string;
  email: string;
  // Add other fields as needed
}


export const signIn = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};

export const signOut = async (token: string) => {
  // Implement token invalidation logic if needed
};

export const refreshJWT = async (refreshToken: string) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as JwtPayload;
    const newToken = jwt.sign({ id: payload.id, email: payload.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return newToken;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
