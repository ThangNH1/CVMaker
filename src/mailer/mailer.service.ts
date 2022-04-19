import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
const re =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, username: string): Promise<any> {
    if (re.test(email.toLowerCase())) {
      await this.mailerService.sendMail({
        to: email,

        from: '"CV Maker" <no-reply@localhost>',

        subject: 'Your Account',

        html: `<h2>Your account have been created successfully</h2>

      <span>Your username is ${username}</span>`,
      });
    } else throw new Error('Invalid Mail');
  }
  async sendInvite(email: any, invitation: string): Promise<any> {
    const _mail = email.mail;
    if (re.test(_mail.toLowerCase())) {
      await this.mailerService.sendMail({
        to: _mail,

        from: '"CV Maker" <no-reply@localhost>',

        subject: 'An invitation',

        html: `<h2>This is and invitation for cvmaker</h2>
    
          <span>The username invitation is ${invitation}</span>
          <h4><a href="http://localhost:3000">Duong dan trang chu</a></h4>
          `,
      });
    } else throw new Error('Invalid Mail');
  }
}
