import { Test, type TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionType } from '@prisma/client';
import { jest } from '@jest/globals';

describe('QuizzesService', () => {
  let service: QuizzesService;
  let prismaService: PrismaService;

  const mockPrismaService: any = {
    quiz: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a quiz successfully', async () => {
      const createQuizDto = {
        title: 'Test Quiz',
        description: 'A test quiz',
        questions: [
          {
            text: 'Is this a test?',
            type: QuestionType.BOOLEAN,
          },
        ],
      };

      const expectedResult = {
        id: '1',
        title: 'Test Quiz',
        description: 'A test quiz',
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [
          {
            id: '1',
            text: 'Is this a test?',
            type: QuestionType.BOOLEAN,
            options: [] as string[],
          },
        ],
      } as any;

      mockPrismaService.quiz.create.mockResolvedValue(expectedResult);

      const result = await service.create(createQuizDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.quiz.create).toHaveBeenCalledWith({
        data: {
          title: createQuizDto.title,
          description: createQuizDto.description,
          questions: {
            create: [
              {
                text: 'Is this a test?',
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
    });

    it('should throw BadRequestException for CHECKBOX question without options', async () => {
      const createQuizDto = {
        title: 'Test Quiz',
        questions: [
          {
            text: 'Choose multiple options',
            type: QuestionType.CHECKBOX,
            options: ['Only one option'],
          },
        ],
      };

      await expect(service.create(createQuizDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all quizzes with question count', async () => {
      const mockQuizzes = [
        {
          id: '1',
          title: 'Quiz 1',
          description: 'First quiz',
          createdAt: new Date(),
          _count: { questions: 3 },
        },
        {
          id: '2',
          title: 'Quiz 2',
          description: null,
          createdAt: new Date(),
          _count: { questions: 5 },
        },
      ];

      mockPrismaService.quiz.findMany.mockResolvedValue(mockQuizzes);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('questionCount', 3);
      expect(result[1]).toHaveProperty('questionCount', 5);
    });
  });

  describe('findOne', () => {
    it('should return a quiz by id', async () => {
      const mockQuiz = {
        id: '1',
        title: 'Test Quiz',
        description: 'A test quiz',
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [],
      };

      mockPrismaService.quiz.findUnique.mockResolvedValue(mockQuiz);

      const result = await service.findOne('1');

      expect(result).toEqual(mockQuiz);
      expect(mockPrismaService.quiz.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          questions: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      });
    });

    it('should throw NotFoundException when quiz not found', async () => {
      mockPrismaService.quiz.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a quiz successfully', async () => {
      mockPrismaService.quiz.delete.mockResolvedValue({});

      await service.remove('1');

      expect(mockPrismaService.quiz.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when quiz to delete not found', async () => {
      mockPrismaService.quiz.delete.mockRejectedValue(new Error('Not found'));

      await expect(service.remove('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });
});
