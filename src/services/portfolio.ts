import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data: any) => {
  return await prisma.portfolio.create({ data });
};

export const findAll = async () => {
  return await prisma.portfolio.findMany();
};

export const findById = async (id: number) => {
  return await prisma.portfolio.findUnique({ where: { id } });
};

export const update = async (id: number, data: any) => {
  return await prisma.portfolio.update({ where: { id }, data });
};

export const remove = async (id: number) => {
  return await prisma.portfolio.delete({ where: { id } });
};
