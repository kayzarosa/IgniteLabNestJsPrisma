import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors/notification-not-found';

interface UnReadNotificationsRequest {
  notificationId: string;
}

type UnReadNotificationsResponse = void;

@Injectable()
export class UnReadNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: UnReadNotificationsRequest): Promise<UnReadNotificationsResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
