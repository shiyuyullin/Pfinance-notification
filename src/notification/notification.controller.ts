import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationModel } from './notification.model';

@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private notificationService: NotificationService) {}

  @Post('send')
  @HttpCode(201)
  async sendNotification(@Body() notification: NotificationModel) {
    return await this.notificationService.sendEmail(notification);
  }
}
