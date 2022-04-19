import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPass } from 'src/auth/hash_password';
import { Accounts } from 'src/entity/accounts.entity';
import { EmailService } from 'src/mailer/mailer.service';
import { Repository } from 'typeorm';
import { AddAccountDTO } from './dto/addAccount.dto';
import * as bcrypt from 'bcrypt';
import { UpdateAccountDTO } from './dto/updateAccount.dto';
import { Invites } from '../entity/invites.entity';
import { DeleteAccountDTO } from './dto/delete.dto';
const RELATION = ['invite', 'resumes'];
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
    @InjectRepository(Invites)
    private inviteRespository: Repository<Invites>,
    private mailService: EmailService,
  ) { }
  async addAccount(addAccountDTO: AddAccountDTO): Promise<any> {
    const account = new Accounts();
    account.username = addAccountDTO.username;
    account.password = await hashPass(addAccountDTO.password);
    account.email = addAccountDTO.email;
    this.mailService.sendEmail(account.email, account.username);
    return this.accountsRepository.save(account);
  }
  async getAccountList(): Promise<Accounts[]> {
    return this.accountsRepository.find({ relations: RELATION });
  }
  async deleteAccount(deleteAccount:DeleteAccountDTO): Promise<any> {
    const account = await this.accountsRepository.findOne(deleteAccount);
    return this.accountsRepository.remove(account);
  }
  async findOne(username: string): Promise<Accounts> {
    return this.accountsRepository.findOne({
      where: { username: username },
      relations: RELATION,
    });
  }
  async findById(id:number):Promise<any>{
    return this.accountsRepository.findOne({id:id})
  }
  async sendInvite(mail: string, invitation: string): Promise<any> {
    var getAccount = await this.getAccountList()
    let getMail = Object.values(mail)
    var getAllEmail = []
    for (let i = 0; i < getAccount.length; i++) {
      await getAllEmail.push('"' + getAccount[i].email+ '"')
      // if (JSON.stringify(getAccount[i].email) == JSON.stringify(a[0])) {
      //   return 0
      // } else {          
      //   return this.mailService.sendInvite(mail, invitation)
    }
    // }
    // console.log(getAllEmail);
    // console.log(mail);

    // console.log(getAllEmail.includes(mail));

    if (getAllEmail.includes(JSON.stringify(getMail[0])) == true) {
      return 0
    } else {
      return this.mailService.sendInvite(mail, invitation);
    }
  }

  //tao tai khoan
  async createInviteAccount(
    createAccount: AddAccountDTO,
    file: Express.Multer.File,
  ): Promise<any> {
    //Get url img
    let url = '';
    if (file) {
      url = this.getUrlOfFile(file);
    }
    var getAccount = await this.getAccountList()
    var getAllUsername = []
    for (let i = 0; i < getAccount.length; i++) {
      await getAllUsername.push( getAccount[i].username )
    }
    
    try {
      // hash pass va them invite vao account
      if (JSON.stringify(getAllUsername).includes(JSON.stringify(createAccount.username))) {        
        return 0
      } else {
        createAccount.password = await hashPass(createAccount.password);
        const _acc = this.accountsRepository.create(createAccount);
        const acc = await this.accountsRepository.save(_acc);
        const accountInviteCode = acc.username + '$inviteCode';
        const invite = await this.inviteRespository.save({
          inviteCode: accountInviteCode,
          account: acc,
        });


        await this.accountsRepository.update(acc.id, { invite, avatar_url: url });

        //gui mail
        // await this.mailService.sendEmail(_acc.email, _acc.username);

        // check invite
        const theInvite = createAccount.inviteCode
          ? await this.inviteRespository.findOne({
            inviteCode: createAccount.inviteCode,
          })
          : null;
        console.log(theInvite);
        if (theInvite) {
          theInvite.inviteCount++;
          await this.inviteRespository.update(theInvite.id, {
            inviteCount: theInvite.inviteCount,
          });
          await this.inviteRespository.update(invite.id, {
            inviteBy: theInvite.inviteCode,
          });
        }

        return acc;
      }
    } catch (error) {
      return { message: 'Error', error: error.message };
    }
  }
  async updateAccount(
    username: string,
    updatedAccount: UpdateAccountDTO,
    file: Express.Multer.File,
  ): Promise<any> {
    const account = await this.accountsRepository.findOne({
      username: username,
    });
    if (updatedAccount.newPassword) {
      await this.accountsRepository.update(account.id, {
        password: await hashPass(updatedAccount.newPassword),
      });
    }
    if (updatedAccount.newEmail) {
      await this.accountsRepository.update(account.id, {
        email: updatedAccount.newEmail,
      });
    }
    if (updatedAccount.newFullName) {
      await this.accountsRepository.update(account.id, {
        fullname: updatedAccount.newFullName,
      });
    }
    let url = '';
    if (file) {
      url = this.getUrlOfFile(file);
      await this.accountsRepository.update(account.id, {
        avatar_url: url,
      });
    }
    return await this.accountsRepository.findOne({
      username: username,
    });
  }
  // get urls of files upload
  getUrlOfFile(file: Express.Multer.File) {
    return file.path;
  }
}
