import { Notification } from '../entities/notifications/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
