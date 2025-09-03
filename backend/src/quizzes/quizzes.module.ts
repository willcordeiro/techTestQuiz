import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [PrismaModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
