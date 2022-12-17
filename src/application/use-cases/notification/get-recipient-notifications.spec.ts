import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let getRecipientNotification: GetRecipientNotification;

describe('Get recipients notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    getRecipientNotification = new GetRecipientNotification(
      inMemoryNotificationsRepository,
    );
  });

  it('should be able to get recipient notifications', async () => {
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
