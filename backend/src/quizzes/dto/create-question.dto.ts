import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional, MinLength } from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The question text',
    example: 'What is the correct way to declare a variable in JavaScript?',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'The type of question',
    enum: QuestionType,
    example: QuestionType.CHECKBOX,
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    description: 'Options for multiple choice questions (required for CHECKBOX type)',
    example: ['var', 'let', 'const', 'variable'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}
