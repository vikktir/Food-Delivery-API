import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from '../entities/orders.entity';
import { LoggerService } from '../logger/logger.service';
import {AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, LoggerService],
  exports: [OrdersService]
})
export class OrdersModule {}