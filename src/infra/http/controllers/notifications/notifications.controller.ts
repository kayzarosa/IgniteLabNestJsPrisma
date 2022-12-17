import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/notification/send-notification';
import { CreateNotificationBody } from '../../dtos/notifications/create-notification-body';
import { NotificationViewModel } from '@infra/http/view-models/notification-view-model';
import { CancelNotifications } from '@application/use-cases/notification/cancel-notification';
import { ReadNotifications } from '@application/use-cases/notification/read-notification';
import { UnReadNotifications } from '@application/use-cases/notification/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/notification/count-recipient-notification';
import { GetRecipientNotification } from '@application/use-cases/notification/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotifications: CancelNotifications,
    private readNotifications: ReadNotifications,
    private unReadNotifications: UnReadNotifications,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotifications.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotifications.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unReadNotifications.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
