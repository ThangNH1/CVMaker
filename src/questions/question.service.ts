import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/entity/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto/create.dto';
import { RemoveQuestionDTO } from './dto/delete.dto';
import { UpdateQuestionDTO } from './dto/update.dto';
import { Fields } from '../entity/field.entity';
import { FindQuestionDTO } from './dto/find.dto';
const RELATION = ['answers', 'field'];
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
    @InjectRepository(Fields)
    private fieldRepository: Repository<Fields>,
  ) {}
  //create a Question
  async createQuestion(createdQuestion: CreateQuestionDTO): Promise<any> {
    const field = await this.fieldRepository.findOne({
      id: createdQuestion.fieldID,
    });
    if (!field) return new NotFoundException();
    return this.questionRepository.save({ ...createdQuestion, field });
  }
  //get Question List
  async getQuestionList(): Promise<Questions[]> {
    return this.questionRepository.find({ relations: ['field'] });
  }
  //remove Question
  async removeQuestion(removedQuestion: RemoveQuestionDTO): Promise<any> {
    const question = await this.questionRepository.findOne(removedQuestion);
    if (question) return this.questionRepository.remove(question);
    throw new NotFoundException();
  }
  //update Question
  async updateQuestion(updatedQuestion: UpdateQuestionDTO): Promise<any> {
    const question = await this.questionRepository.findOne(updatedQuestion.id);
    if (!question) throw new NotFoundException();
    return this.questionRepository.update(updatedQuestion.id, {
      content: updatedQuestion.content,
    });
  }
  // find one question
  async findQuestion(question: FindQuestionDTO): Promise<any> {
    const theQuestion = await this.questionRepository.findOne(question);
    if (theQuestion) return theQuestion;
    throw new NotFoundException();
  }
}
