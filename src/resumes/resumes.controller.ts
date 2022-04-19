import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger/dist';
import { CreateResumeDTO, ResumeIdDTO } from './dto/create.dto';
import { RemoveResumeDTO } from './dto/remove.dto';
import { UpdateResumeDTO } from './dto/update.dto';
import { ResumesService } from './resumes.service';
import { ApiOperation } from '@nestjs/swagger';
import { error } from 'console';
import { CurrentUser } from 'src/decorator/getCurrentUser';
import { CurrentUserDTO } from 'src/entity/accounts.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { createReadStream } from 'fs';
import { join } from 'path';
@ApiTags('Resumes')
@ApiBearerAuth('access-token')
@Controller('resumes')
export class ResumesController {
  constructor(private resumeService: ResumesService) {}
  // anh quan getFinalSuperExtraLatestNotAnyMoreResumeDTO
  @ApiOperation({ summary: 'Get all CV' })
  @Get('getallCV')
  async getallCV() {
    return await this.resumeService.getCVList();
  }
  //get resume by id
  @Get('GetCVById')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get CV by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async gettCVbyId(
    @CurrentUser() user: CurrentUserDTO,
    @Query() id: ResumeIdDTO,
  ) {
    return await this.resumeService.getCVbyId(user.userId, id.id);
  }
  //Post Create Resume
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a CV' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createResume(
    @CurrentUser() user: CurrentUserDTO,
    @Body() createdResume: CreateResumeDTO,
  ): Promise<any> {
    return await this.resumeService.createResumes(user.userId, createdResume);
  }
  //Delete Resume
  @Delete('remove')
  @ApiOperation({ summary: 'Remove resume by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async removeResume(@Body() removedResume: RemoveResumeDTO) {
    return await this.resumeService.removeResume(removedResume);
  }
  //Get Resume List
  @Get('list')
  @ApiOperation({ summary: 'Get resume list' })
  async getList() {
    return await this.resumeService.getResumesList();
  }
  //Update ResumeList
  @ApiOperation({ summary: 'Update resume by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Put('update')
  async updateResume(@Body() updatedResume: UpdateResumeDTO) {
    return await this.resumeService.updateResume(updatedResume);
  }
  //PDF-CV
  @Get('download')
  @ApiOperation({ summary: 'Get CV by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  async download(
    @CurrentUser() user: CurrentUserDTO,
    @Query() id: ResumeIdDTO,
    @Res() res,
  ) {
    // await this.resumeService.createPDF(user.userId, id.id);
    // const fileName = 'result.pdf';
    // return res.sendFile('' + fileName);
    // // return this.resumeService.createPDF(id).catch((error) => {
    // //   console.log(error);
    // // });
    // await this.resumeService.createPDF(user.userId, id.id, res);
  }
}
