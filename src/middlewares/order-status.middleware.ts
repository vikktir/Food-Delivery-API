import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {OrdersService} from '../orders/orders.service';

@Injectable()
export class OrderStatusMiddleware implements NestMiddleware {
  constructor(private readonly ordersService: OrdersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const orderId = Number(request.params.path[0]);

    console.log(this.ordersService.getOrderByID(orderId));


    if (!orderId) {
      return response.status(400).json({ message: 'Не вказан ID замовлення' });
    }

    const order = await this.ordersService.getOrderByID(orderId);

    console.log(order);

    if (!order) {
      return response.status(404).json({ message: 'Замовлення не знайдено' });
    }

    if (request.method === 'PATCH' && request.body.status) {
      const newStatus = request.body.status;
      const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED'];

      if (!validStatuses.includes(newStatus)) {
        return response.status(400).json({
          message: 'Невірний статус замовлення',
          validStatuses
        });
      }

      if (!this.isValidStatusTransition(order.status, newStatus)) {
        return response.status(400).json({
          message: 'Неприпустимий перехід статусу',
          currentStatus: order.status,
          requestedStatus: newStatus
        });
      }
    }

    request['order'] = order;
    next();
  }

  private isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
    const statusTransitions = {
      'PENDING': ['PROCESSING', 'CANCELED'],
      'PROCESSING': ['COMPLETED', 'CANCELED'],
      'COMPLETED': [],
      'CANCELED': []
    };

    return statusTransitions[currentStatus]?.includes(newStatus) ?? false;
  }
}