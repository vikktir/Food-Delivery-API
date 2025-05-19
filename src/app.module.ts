import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { DeliveryTrackingMiddleware } from './middlewares/delivery-tracking.middleware';
import { OrderStatusMiddleware } from './middlewares/order-status.middleware';
import { CourierAvailabilityMiddleware } from './middlewares/courier-availability.middleware';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { DeliveryService } from './delivery/delivery.service';
import { RestaurantsService } from './restaurants/restaurants.service';
import { DeliveryController } from './delivery/delivery.controller';
import { OrdersModule } from './orders/orders.module';




@Module({
  imports: [DBModule, OrdersModule],
  controllers: [
    AppController,
    UsersController,
    ProductsController,
    DeliveryController,
    RestaurantsController
  ],
  providers: [
    AppService,
    UsersService,
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
      .forRoutes('delivery/courier/*')
    // consumer
    //   .apply(OrderStatusMiddleware)
    //   .exclude('restaurants/:id/menu', 'restaurants/:id/menu/*', 'orders/create')
    //   .forRoutes('orders/*')
    // consumer
    //   .apply(DeliveryTrackingMiddleware)
    //   .exclude('/delivery/couriers/*', '/delivery/couriers', 'delivery/create')
    //   .forRoutes('delivery/*');
  }
}