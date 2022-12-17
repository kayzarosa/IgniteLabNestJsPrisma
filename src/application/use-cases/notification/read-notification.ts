import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors/notification-not-found';

interface ReadNotificationsRequest {
  notificationId: string;
}

type ReadNotificationsResponse = void;

@Injectable()
export class ReadNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: ReadNotificationsRequest): Promise<ReadNotificationsResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
