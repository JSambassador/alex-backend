import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ email, password, name }: RegisterUserInput): Promise<User> => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists.');
  }

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const getUserProfile = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { portfolios: true },
  });
};

export const updateUserProfile = async (id: number, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
