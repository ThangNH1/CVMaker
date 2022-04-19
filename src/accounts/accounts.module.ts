import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Accounts } from 'src/entity/accounts.entity';
import { AccountsController } from 'src/accounts/accounts.controller';
import { AccountsService } from 'src/accounts/accounts.service';
import { MailModule } from 'src/mailer/mailer.module';
import { Invites } from '../entity/invites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, Invites]),
    AuthModule,
    MailModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
