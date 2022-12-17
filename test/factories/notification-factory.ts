import { Content } from '@application/entities/notifications/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('This is a notification'),
    category: 'social',
    recipientId: 'recipient-2',
    ...override,
  });
}
