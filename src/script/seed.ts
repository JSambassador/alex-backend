import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userData = [
  {
    email: 'test@example.com',
    password: 
    bcrypt.hash('password123', 10), // Replace with hashed password
    name: 'Test User',
    portfolio: [
      {
        cardImg: 'path/to/image1.jpg',
        title: {
          en: { title: 'Project Title 1' },
          ru: { title: 'Название проекта 1' }
        },
        cardDescription: {
          en: { description: 'Short description of project 1' },
          ru: { description: 'Краткое описание проекта 1' }
        },
        labels: {
          en: ['Web Development', 'Design'],
          ru: ['Веб-разработка', 'Дизайн']
        },
        logo: 'path/to/logo1.png',
        previewLink: 'https://example.com/preview1',
        link: 'https://example.com/project1',
        bgImg: 'path/to/bg1.jpg',
        description: {
          en: { description: 'Detailed description of project 1' },
          ru: { description: 'Подробное описание проекта 1' }
        },
        client: 'Client 1',
        scope: {
          en: { scope: 'Full stack development' },
          ru: { scope: 'Полная разработка' }
        },
        date: {
          start: new Date('2024-01-01'),
          finish: new Date('2024-04-01')
        },
        feedback: {
          text: {
            en: 'Great job!',
            ru: 'Отличная работа!'
          },
          avatar: 'path/to/avatar1.jpg',
          name: 'Client Name 1',
          role: {
            en: 'CEO',
            ru: 'Генеральный директор'
          },
          bg: 'path/to/feedback-bg1.jpg'
        },
        content: [
          ['path/to/image1_1.jpg', 'path/to/image1_2.jpg'],
          ['path/to/image1_3.jpg', 'path/to/image1_4.jpg']
        ]
      },
      {
        cardImg: 'path/to/image2.jpg',
        title: {
          en: { title: 'Project Title 2' },
          ru: { title: 'Название проекта 2' }
        },
        cardDescription: {
          en: { description: 'Short description of project 2' },
          ru: { description: 'Краткое описание проекта 2' }
        },
        labels: {
          en: ['Mobile App', 'UX/UI'],
          ru: ['Мобильное приложение', 'UX/UI']
        },
        logo: 'path/to/logo2.png',
        previewLink: 'https://example.com/preview2',
        link: 'https://example.com/project2',
        bgImg: 'path/to/bg2.jpg',
        description: {
          en: { description: 'Detailed description of project 2' },
          ru: { description: 'Подробное описание проекта 2' }
        },
        client: 'Client 2',
        scope: {
          en: { scope: 'UI/UX Design and Development' },
          ru: { scope: 'Дизайн и разработка UI/UX' }
        },
        date: {
          start: new Date('2023-08-01'),
          finish: new Date('2023-12-01')
        },
        feedback: {
          text: {
            en: 'Excellent work!',
            ru: 'Превосходная работа!'
          },
          avatar: 'path/to/avatar2.jpg',
          name: 'Client Name 2',
          role: {
            en: 'Product Manager',
            ru: 'Менеджер продукта'
          },
          bg: 'path/to/feedback-bg2.jpg'
        },
        content: [
          ['path/to/image2_1.jpg', 'path/to/image2_2.jpg'],
          ['path/to/image2_3.jpg', 'path/to/image2_4.jpg']
        ]
      }
    ]
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
