import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  account: {
    user: string;
    pass: string;
  };

  transport: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((acc) => {
      this.account = acc;

      this.transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: acc.user,
          pass: acc.pass,
        },
      });
    });
  }

  async sendMail(options: Mail.Options) {
    try {
      const info = await this.transport.sendMail(options);

      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (e) {
      console.log({ mailError: e });
    }
  }
}
