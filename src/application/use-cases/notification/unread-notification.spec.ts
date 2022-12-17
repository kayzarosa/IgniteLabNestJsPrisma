import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found';
import { UnReadNotifications } from './unread-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let unReadNotifications: UnReadNotifications;

describe('Unread notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    unReadNotifications = new UnReadNotifications(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationsRepository.create(notification);

    await unReadNotifications.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a now existing notification', async () => {
    expect(async () => {
      return await unReadNotifications.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
