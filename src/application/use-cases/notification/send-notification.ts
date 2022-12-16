import { Notification } from '@application/entities/notifications/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Content } from '@application/entities/notifications/content';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    category,
    recipientId,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
