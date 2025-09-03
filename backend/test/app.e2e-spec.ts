import { Test, type TestingModule } from '@nestjs/testing';
import { type INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { QuestionType } from '@prisma/client';
import { describe, beforeAll, beforeEach, afterAll, it, expect } from '@jest/globals';

describe('QuizzesController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  beforeEach(async () => {
    // Clean database before each test
    await prismaService.question.deleteMany();
    await prismaService.quiz.deleteMany();
  });

  afterAll(async () => {
    await prismaService.question.deleteMany();
    await prismaService.quiz.deleteMany();
    await prismaService.$disconnect();
    await app.close();
  });

  describe('/quizzes (POST)', () => {
    it('should create a new quiz', () => {
      const createQuizDto = {
        title: 'JavaScript Fundamentals',
        description: 'Test your JavaScript knowledge',
        questions: [
          {
            text: 'Is JavaScript a compiled language?',
            type: QuestionType.BOOLEAN,
          },
          {
            text: 'What is your favorite JavaScript framework?',
            type: QuestionType.INPUT,
          },
          {
            text: 'Which of these are JavaScript frameworks?',
            type: QuestionType.CHECKBOX,
            options: ['React', 'Vue', 'Angular', 'Django'],
          },
        ],
      };

      return request(app.getHttpServer())
        .post('/quizzes')
        .send(createQuizDto)
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(createQuizDto.title);
          expect(res.body.questions).toHaveLength(3);
        });
    });

    it('should return 400 for invalid quiz data', () => {
      const invalidQuizDto = {
        title: '', // Empty title should fail validation
        questions: [],
      };

      return request(app.getHttpServer()).post('/quizzes').send(invalidQuizDto).expect(400);
    });
  });

  describe('/quizzes (GET)', () => {
    it('should return all quizzes', async () => {
      // Create a test quiz first
      const quiz = await prismaService.quiz.create({
        data: {
          title: 'Test Quiz',
          description: 'A test quiz',
          questions: {
            create: [
              {
                text: 'Test question',
                type: QuestionType.BOOLEAN,
                options: [],
              },
            ],
          },
        },
      });

      return request(app.getHttpServer())
        .get('/quizzes')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0]).toHaveProperty('id', quiz.id);
          expect(res.body[0]).toHaveProperty('questionCount', 1);
        });
    });
  });

  describe('/quizzes/:id (GET)', () => {
    it('should return a specific quiz', async () => {
      const quiz = await prismaService.quiz.create({
        data: {
          title: 'Test Quiz',
          description: 'A test quiz',
          questions: {
            create: [
              {
                text: 'Test question',
                type: QuestionType.BOOLEAN,
                options: [],
              },
            ],
          },
        },
        include: {
          questions: true,
        },
      });

      return request(app.getHttpServer())
        .get(`/quizzes/${quiz.id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.id).toBe(quiz.id);
          expect(res.body.questions).toHaveLength(1);
        });
    });

    it('should return 404 for non-existent quiz', () => {
      return request(app.getHttpServer()).get('/quizzes/non-existent-id').expect(404);
    });
  });

  describe('/quizzes/:id (DELETE)', () => {
    it('should delete a quiz', async () => {
      const quiz = await prismaService.quiz.create({
        data: {
          title: 'Test Quiz',
          questions: {
            create: [
              {
                text: 'Test question',
                type: QuestionType.BOOLEAN,
                options: [],
              },
            ],
          },
        },
      });

      return request(app.getHttpServer()).delete(`/quizzes/${quiz.id}`).expect(204);
    });

    it('should return 404 when deleting non-existent quiz', () => {
      return request(app.getHttpServer()).delete('/quizzes/non-existent-id').expect(404);
    });
  });
});
