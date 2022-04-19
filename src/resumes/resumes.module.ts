import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/entity/accounts.entity';
import { Fields } from 'src/entity/field.entity';
import { Resumes } from 'src/entity/resumes.entity';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resumes, Accounts, Fields])],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumeModule {}
