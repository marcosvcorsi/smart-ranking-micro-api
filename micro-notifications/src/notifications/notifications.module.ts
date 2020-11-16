import { Module } from '@nestjs/common';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [
    ClientProxyModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
