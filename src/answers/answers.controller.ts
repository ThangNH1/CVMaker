import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { Answers } from 'src/entity/answers.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AnswersService } from './answers.service';
import { CreateAnswerDTO } from './dto/create.dto';
import { RemoveAnswerDTO } from './dto/delete.dto';
import { UpdateAnswersDTO } from './dto/update.dto';
@ApiTags('Answers')
@ApiBearerAuth('access-token')
@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}
  //Create An Answers
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Save a resume answer ' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createAnswers(
    @Body() createdAnswer: CreateAnswerDTO,
  ): Promise<Answers> {
    return await this.answersService.createAnswers(createdAnswer);
  }
  //Remove answers
  @Delete('remove')
  @ApiOperation({ summary: 'Remove answer by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async removeAnswers(@Body() removedAnswers: RemoveAnswerDTO): Promise<any> {
    return await this.answersService.removeAnswer(removedAnswers);
  }
  //Update answers
  @Put('update')
  @ApiOperation({ summary: 'Update answers by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateAnswer(@Body() updatedAnswers: UpdateAnswersDTO) {
    return await this.answersService.updateAnswer(updatedAnswers);
  }
  //Find resume answers
  @Get('resume-answers')
  @ApiOperation({ summary: 'Find all resume answer by resume id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async getResumeAnswers(@Query() resumeId: RemoveAnswerDTO) {
    return await this.answersService.findResumeAnswers(resumeId);
  }
  @Get('list')
  @ApiOperation({ summary: 'Get all answers list' })
  async getList() {
    return await this.answersService.getAnswersList();
  }
}
