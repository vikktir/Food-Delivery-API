import {Module} from '@nestjs/common';
import { DeliveryService } from './delivery.service'
import { LoggerService } from '../logger/logger.service';

@Module({
  controllers: [],
  providers: [DeliveryService],
  exports: [DeliveryService, LoggerService]
})
export class DeliveryModule {}