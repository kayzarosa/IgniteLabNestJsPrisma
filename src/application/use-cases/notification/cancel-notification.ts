import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors/notification-not-found';

interface CancelNotificationsRequest {
  notificationId: string;
}

type CancelNotificationsResponse = void;

@Injectable()
export class CancelNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationsRequest): Promise<CancelNotificationsResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
