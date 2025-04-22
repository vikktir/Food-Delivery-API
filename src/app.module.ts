import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './databases/databases.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { LoggerService } from './logger/logger.service';




@Module({
  imports: [DBModule],
  controllers: [AppController, OrdersController, UsersController, ProductsController],
  providers: [AppService, OrdersService, UsersService, ProductsService, LoggerService],
})
export class AppModule {}
