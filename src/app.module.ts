import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { RolesGuard } from './guard/roles.guard';
import { InvitesModule } from './invites/invites.module';
import { QuestionModule } from './questions/question.module';
import { ResumeModule } from './resumes/resumes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FieldsModule,
    QuestionModule,
    AccountsModule,
    AuthModule,
    RolesGuard,
    AnswersModule,
    ResumeModule,
    InvitesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
