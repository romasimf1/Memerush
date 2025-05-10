import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.post.create({
    data: {
      userId: 'testuser',
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Тестовое видео',
      description: 'Видео для теста',
      tags: ['video', 'test'],
      likes: 0,
      views: 0,
      createdAt: new Date('2025-05-04T23:48:25.000Z'),
    },
  });
  await prisma.post.create({
    data: {
      userId: 'tXhvrvU7qQQfte5c6sUGC1EDfvM2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Тестовый мем',
      description: 'Просто мем для теста',
      tags: ['fun', 'game'],
      likes: 0,
      views: 0,
      createdAt: new Date('2025-05-04T23:33:27.000Z'),
    },
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); }); 