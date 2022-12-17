import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found';
import { CancelNotifications } from './cancel-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let cancelNotifications: CancelNotifications;

describe('Cancel notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    cancelNotifications = new CancelNotifications(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    await cancelNotifications.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a now existing notification', async () => {
    expect(async () => {
      return await cancelNotifications.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
