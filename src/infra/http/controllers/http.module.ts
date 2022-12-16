import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/notification/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './notifications/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
