import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationModel } from './notification.model';
import { Parser } from 'src/util/DataParser';

@Controller()
export class NotificationController {
  private readonly logger: Logger = new Logger(NotificationController.name);

  constructor(private notificationService: NotificationService) {}

  @MessagePattern('add-income')
  async sendNotification(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    this.logger.debug(data);
    let emailAndUsername = Parser(data);
    let notification: NotificationModel = {
      recipientEmail: emailAndUsername[0],
      subject: emailAndUsername[1] + ' deposited a new income',
      message: 'You have made a new income deposit, keep up!',
    };
    this.logger.debug(notification);
    this.notificationService.sendEmail(notification);
    channel.ack(message);
  }
}
