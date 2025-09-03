import { Test, type TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuestionType } from '@prisma/client';
import { jest } from '@jest/globals';

describe('QuizzesController', () => {
  let controller: QuizzesController;
  let service: QuizzesService;

  const mockQuizzesService: any = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [
        {
          provide: QuizzesService,
          useValue: mockQuizzesService,
        },
      ],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
    service = module.get<QuizzesService>(QuizzesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a quiz', async () => {
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
        ...createQuizDto,
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

      mockQuizzesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createQuizDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createQuizDto);
    });
  });

  describe('findAll', () => {
    it('should return all quizzes', async () => {
      const expectedResult = [
        {
          id: '1',
          title: 'Quiz 1',
          description: 'First quiz',
          createdAt: new Date(),
          questionCount: 3,
        },
      ];

      mockQuizzesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a quiz by id', async () => {
      const expectedResult = {
        id: '1',
        title: 'Test Quiz',
        description: 'A test quiz',
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [],
      };

      mockQuizzesService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('remove', () => {
    it('should delete a quiz', async () => {
      mockQuizzesService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
