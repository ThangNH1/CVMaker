import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../entity/question.entity';
import { QuestionsController } from './question.controller';
import { QuestionsService } from './question.service';
import { Fields } from '../entity/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, Fields])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionModule {}
