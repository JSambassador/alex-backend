import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.userRole.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // Create roles
  const roles = await Promise.all([
    prisma.role.create({ data: { name: 'Admin' } }),
    prisma.role.create({ data: { name: 'User' } }),
  ]);

  // Create users with associated roles
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'user1',
        password: 'password1', // In a real app, hash this password
        email: 'user1@example.com',
        roles: {
          create: [
            { roleId: roles[0].id }, // Admin
            { roleId: roles[1].id }, // User
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'user2',
        password: 'password2', // In a real app, hash this password
        email: 'user2@example.com',
        roles: {
          create: [{ roleId: roles[1].id }], // User
        },
      },
    }),
  ]);

  // Create portfolios
  await Promise.all([
    prisma.portfolio.create({
      data: {
        title: 'Portfolio 1',
        description: 'Description 1',
        userId: users[0].id, // Linking to user1
      },
    }),
    prisma.portfolio.create({
      data: {
        title: 'Portfolio 2',
        description: 'Description 2',
        userId: users[1].id, // Linking to user2
      },
    }),
  ]);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
