import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { AccountsService } from 'src/accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { CurrentUser } from 'src/decorator/getCurrentUser';
import { AddAccountDTO } from './dto/addAccount.dto';
import { Accounts, CurrentUserDTO } from 'src/entity/accounts.entity';
import { LoginDTO } from './dto/login.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { error } from 'console';
import { UpdateAccountDTO } from './dto/updateAccount.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, Dest } from 'src/upload.config';
import { DeleteAccountDTO } from './dto/delete.dto';

@ApiTags('Accounts')
@ApiBearerAuth('access-token')
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private authService: AuthService,
  ) { }
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('remove')
  @ApiOperation({ summary: 'Remove account by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async deleteAccount(@Body() deleteAccount: DeleteAccountDTO) {
    return this.accountsService.deleteAccount(deleteAccount).catch((err) => {
      return err;
    });
  }
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Post('add')
  // @ApiOperation({ summary: 'Add account' })
  // @ApiConsumes('application/x-www-form-urlencoded')
  // async addAccount(@Body() addAccountDTO: AddAccountDTO): Promise<Accounts> {
  //   return this.accountsService.addAccount(addAccountDTO).catch((err) => {
  //     return err;
  //   });
  // }
  //tao tai khoan co loi moi
  @Post('create')
  @UseInterceptors(FileInterceptor('images', multerOptions(Dest.Profile)))
  @ApiOperation({ summary: 'Create account' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        fullname: {
          type: 'string',
        },
        inviteCode: {
          type: 'string',
        },
        images: {
          type: 'file',
          description: 'Choose your picture',
        },
      },
    },
  })
  async createAccount(
    @Body() addAccountDTO: AddAccountDTO,
    @UploadedFile() file,
  ): Promise<any> {
    console.log(file);
    try {
      let check = await this.accountsService.createInviteAccount(addAccountDTO, file);
      // return await this.accountsService.createInviteAccount(addAccountDTO, file);
      if (check == 0) {
        return { message : 'Username already exist !'}
      } else {
        return check
      }
    }
    catch (err) {
      return err
    }
  }
    // @Roles(Role.Admin)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('find')
    @ApiOperation({ summary: 'Find a account by username' })
    @ApiConsumes('application/x-www-form-urlencoded')
    async findAccount(@Query('username') username: string) {
      return await this.accountsService.findOne(username).catch((err) => {
        return err;
      });
    }
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Get accounts list' })
    @Get('list')
    async getList() {
      return await this.accountsService.getAccountList().catch((err) => {
        return err;
      });
    }
    // @Post('login')
    // async Login(
    //     @Body('username') username:string,
    //     @Body('password') password:string,
    //     @Res({passthrough:true}) response:Response
    // ){
    //     const user = await this.accountsService.findOne(username)
    //     if(!user){
    //         throw Error
    //     }
    //     if(!await bcrypt.compare(password,user.password)){
    //         throw Error
    //     }

    //     const jwt = await this.authService.loginUser(user)

    //     response.cookie('jwt',jwt,{httpOnly:true})

    //     return {message:'success'}
    // }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login account and return a access token' })
    @ApiConsumes('application/x-www-form-urlencoded')
    async login(@Body() loginDTO: LoginDTO) {
      const users = await this.accountsService.findOne(loginDTO.username);
      return await this.authService.loginUser(users);
    }

    // send current user invitation
    @ApiOperation({ summary: 'Send current user invitation to mail' })
    // @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(JwtAuthGuard)
    @Post('invite')
    async sendInvite(@CurrentUser() user: CurrentUserDTO, @Body() mail: string) {
      try {
        let check = await this.accountsService.sendInvite(mail, user.invite);
        if (check != 0) {
          return { message: 'Invitation sended !' };
        } else {
          return { message: 'Email already exist !' };
        }
      } catch (error) {
        return { message: 'Error', error: error.message };
      }
    }
    //get Currenuser
    @ApiOperation({ summary: 'Get current user info' })
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrentUser() user) {
      return user;
    }

    //update account
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('images', multerOptions(Dest.Profile)))
    @ApiOperation({ summary: 'Update account (Must Login)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          newFullName: {
            type: 'string',
          },
          newPassword: {
            type: 'string',
          },
          newEmail: {
            type: 'string',
          },
          images: {
            type: 'file',
            description: 'Chose your picture',
          },
        },
      },
    })
    @Post('Update')
    async updateAccount(
    @CurrentUser() user: CurrentUserDTO,
    @Body() updatedAccount: UpdateAccountDTO,
    @UploadedFile() file,
  ) {
      const username = user.username;
      return await this.accountsService.updateAccount(
        username,
        updatedAccount,
        file,
      );
    }
  }
