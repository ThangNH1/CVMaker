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
import { QuestionsService } from './question.service';
import { CreateQuestionDTO } from './dto/create.dto';
import { Questions } from 'src/entity/question.entity';
import { RemoveQuestionDTO } from './dto/delete.dto';
import { UpdateQuestionDTO } from './dto/update.dto';
import { FindQuestionDTO } from './dto/find.dto';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Questions')
@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  //Post Create Question
  @Post('create')
  @ApiOperation({ summary: 'Create a Question' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createQuestion(
    @Body() createdQuestion: CreateQuestionDTO,
  ): Promise<Questions> {
    return await this.questionService.createQuestion(createdQuestion);
  }
  //Delete Question
  @Delete('remove')
  @ApiOperation({ summary: 'Remove a Question by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async removeQuestion(
    @Body() removedQuestion: RemoveQuestionDTO,
  ): Promise<any> {
    return await this.questionService.removeQuestion(removedQuestion);
  }
  //Get Question List
  @ApiOperation({ summary: 'Get question list' })
  @Get('list')
  async getList() {
    return await this.questionService.getQuestionList();
  }
  //Update Question
  @ApiOperation({ summary: 'Update a Question by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Put('update')
  async updateQuestion(@Body() updatedQuestion: UpdateQuestionDTO) {
    return await this.questionService.updateQuestion(updatedQuestion);
  }
  // find question
  @ApiOperation({ summary: 'Find a Question by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Get('find')
  async getQuestion(@Query() question: FindQuestionDTO) {
    return await this.questionService.findQuestion(question);
  }
}
