import { ApiProperty } from "@nestjs/swagger"
import { QuestionType } from "@prisma/client"

export class QuestionResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  text: string

  @ApiProperty({ enum: QuestionType })
  type: QuestionType

  @ApiProperty({ type: [String], required: false })
  options?: string[]
}

export class QuizResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ type: [QuestionResponseDto] })
  questions: QuestionResponseDto[]
}

export class QuizListItemDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  questionCount: number
}
