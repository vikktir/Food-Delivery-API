import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from '../entities/orders.entity';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, LoggerService],
  exports: [OrdersService]
})
export class OrdersModule {}