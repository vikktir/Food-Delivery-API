import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './databases/databases.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { LoggerService } from './logger/logger.service';
import { CourierAvailabilityMiddleware } from './middlewares/courier-availability.middleware';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { DeliveryService } from './delivery/delivery.service';
import { RestaurantsService } from './restaurants/restaurants.service';
import { DeliveryController } from './delivery/delivery.controller';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DBModule,
    OrdersModule,
    UsersModule,
    AuthModule
  ],
  controllers: [
    AppController,
    ProductsController,
    DeliveryController,
    RestaurantsController
  ],
  providers: [
    AppService,
    ProductsService,
    LoggerService,
    DeliveryService,
    RestaurantsService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CourierAvailabilityMiddleware)
      .exclude('/delivery/courier/create')
      .forRoutes('delivery/courier/*');
  }
}