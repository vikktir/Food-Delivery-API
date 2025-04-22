import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { LoggerService} from '../logger/logger.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, LoggerService],
  exports: [OrdersService],
})
export class OrdersModule {}