import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/notification/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './notifications/notifications.controller';
import { CancelNotifications } from '@application/use-cases/notification/cancel-notification';
import { ReadNotifications } from '@application/use-cases/notification/read-notification';
import { UnReadNotifications } from '@application/use-cases/notification/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/notification/count-recipient-notification';
import { GetRecipientNotification } from '@application/use-cases/notification/get-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotifications,
    ReadNotifications,
    UnReadNotifications,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
