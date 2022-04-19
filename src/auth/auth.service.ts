import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsService } from 'src/accounts/accounts.service';
@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountsService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async hashPass(password): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async loginUser(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
      role: user.role,
      invite: user.invites,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
