import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotificationModel } from './notification.model';
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  private gmail = process.env.GMAIL;
  private gmailpassword = process.env.GMAILPASSWORD;

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.gmail,
      pass: this.gmailpassword,
    },
  });

  async sendEmail(notification: NotificationModel) {
    const message = {
      from: this.gmail,
      to: notification.recipientEmail,
      subject: notification.subject,
      text: notification.message,
    };
    try {
      //   throw new InternalServerErrorException('Something went wrong');
      this.logger.log(
        'Email notification sent to ' + notification.recipientEmail,
      );
      return await this.transporter.sendMail(message);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Failed to send notification, try again later',
      );
    }
  }
}
