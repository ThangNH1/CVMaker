import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from 'src/entity/question.entity';
import { Answers } from 'src/entity/answers.entity';
import { CreateAnswerDTO } from './dto/create.dto';
import { RemoveAnswerDTO } from './dto/delete.dto';
import { UpdateAnswersDTO } from './dto/update.dto';
import { Resumes } from '../entity/resumes.entity';
const RELATION = ['question', 'resume'];
@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
    @InjectRepository(Resumes)
    private resumeRepository: Repository<Resumes>,
    @InjectRepository(Answers)
    private answersRepository: Repository<Answers>,
  ) {}
  //create an answers
  async createAnswers(createdAnswer: CreateAnswerDTO): Promise<any> {
    const question = await this.questionRepository.findOne({
      id: createdAnswer.questionId,
    });
    const resume = await this.resumeRepository.findOne({
      id: createdAnswer.resumeId,
    });
    return this.answersRepository.save({ ...createdAnswer, question, resume });
  }
  // get Answers List
  async getAnswersList(): Promise<Answers[]> {
    return this.answersRepository.find({ relations: RELATION });
  }
  // remove Answers
  async removeAnswer(removedAnswer: RemoveAnswerDTO): Promise<any> {
    const answer = await this.answersRepository.findOne(removedAnswer);
    if (answer) return this.answersRepository.remove(answer);
    throw new NotFoundException();
  }
  async updateAnswer(updatedAnswer: UpdateAnswersDTO): Promise<any> {
    const answer = await this.answersRepository.findOne({
      id: updatedAnswer.id,
    });
    if (!answer) throw new NotFoundException();
    return this.answersRepository.update(updatedAnswer.id, {
      answer: updatedAnswer.answer,
    });
  }
  async findResumeAnswers(resumeId: RemoveAnswerDTO): Promise<any> {
    return this.resumeRepository.findOne(resumeId, {
      relations: ['answers'],
    });
  }
}
