import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
