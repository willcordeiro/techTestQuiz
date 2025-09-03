import { Controller, Get, Post, Param, Delete, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizResponseDto, QuizListItemDto } from './dto/quiz-response.dto';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  private readonly logger = new Logger(QuizzesController.name);

  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiBody({ type: CreateQuizDto })
  @ApiResponse({
    status: 201,
    description: 'Quiz created successfully',
    type: QuizResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(createQuizDto: CreateQuizDto): Promise<QuizResponseDto> {
    this.logger.log('POST /quizzes - Creating new quiz');
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({
    status: 200,
    description: 'List of all quizzes',
    type: [QuizListItemDto],
  })
  async findAll(): Promise<QuizListItemDto[]> {
    this.logger.log('GET /quizzes - Fetching all quizzes');
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz details',
    type: QuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async findOne(@Param('id') id: string): Promise<QuizResponseDto> {
    this.logger.log(`GET /quizzes/${id} - Fetching quiz details`);
    return this.quizzesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @ApiResponse({ status: 204, description: 'Quiz deleted successfully' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`DELETE /quizzes/${id} - Deleting quiz`);
    return this.quizzesService.remove(id);
  }
}
