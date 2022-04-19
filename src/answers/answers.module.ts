import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/entity/accounts.entity';
import { Answers } from 'src/entity/answers.entity';
import { Questions } from 'src/entity/question.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Resumes } from '../entity/resumes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answers, Resumes, Questions])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
