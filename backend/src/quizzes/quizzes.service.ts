import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateQuizDto } from './dto/create-quiz.dto';
import type { QuizResponseDto, QuizListItemDto } from './dto/quiz-response.dto';
import { QuestionType } from '@prisma/client';

@Injectable()
export class QuizzesService {
  private readonly logger = new Logger(QuizzesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<QuizResponseDto> {
    this.logger.log(`Creating new quiz: ${createQuizDto.title}`);

    this.validateQuestions(createQuizDto.questions);

    try {
      const quiz = await this.prisma.quiz.create({
        data: {
          title: createQuizDto.title,
          description: createQuizDto.description,
          questions: {
            create: createQuizDto.questions.map(question => ({
              text: question.text,
              type: question.type,
              options: question.options || [],
            })),
          },
        },
        include: {
          questions: true,
        },
      });

      this.logger.log(`Successfully created quiz with ID: ${quiz.id}`);
      return {
        ...quiz,
        description: quiz.description ?? undefined,
      };
    } catch (error) {
      this.logger.error('Failed to create quiz', error);
      throw new BadRequestException('Failed to create quiz');
    }
  }

  async findAll(): Promise<QuizListItemDto[]> {
    this.logger.log('Fetching all quizzes');

    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description ?? undefined,
      createdAt: quiz.createdAt,
      questionCount: quiz._count.questions,
    }));
  }

  async findOne(id: string): Promise<QuizResponseDto> {
    this.logger.log(`Fetching quiz with ID: ${id}`);

    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      this.logger.warn(`Quiz not found with ID: ${id}`);
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return {
      ...quiz,
      description: quiz.description ?? undefined,
    };
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting quiz with ID: ${id}`);

    try {
      await this.prisma.quiz.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted quiz with ID: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete quiz with ID: ${id}`, error);
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
  }

  private validateQuestions(questions: any[]): void {
    for (const question of questions) {
      if (question.type === QuestionType.CHECKBOX) {
        if (!question.options || question.options.length < 2) {
          throw new BadRequestException('CHECKBOX questions must have at least 2 options');
        }
      }
    }
  }
}
