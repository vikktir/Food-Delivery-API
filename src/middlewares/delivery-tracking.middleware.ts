import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {DeliveryService} from '../delivery/delivery.service';
import {LoggerService} from '../logger/logger.service';

@Injectable()
export class DeliveryTrackingMiddleware implements NestMiddleware {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly logger: LoggerService
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const deliveryId = Number(request.params.path[0]);

    if (!deliveryId) {
      this.logger.log('[ERROR] Спроба доступу до доставки без вказання ID');
      return response.status(400).json({ message: 'Не вказан ID доставки' });
    }

    const delivery = await this.deliveryService.getDeliveryById(deliveryId);

    if (!delivery) {
      this.logger.log(`[ERROR] Доставка з ID ${deliveryId} не знайдена`);
      return response.status(404).json({ message: 'Доставка не знайдена' });
    }

    this.logger.log(`Відстеження доставки #${deliveryId}: статус - ${delivery.status}`);
    this.logger.log(`Деталі доставки #${deliveryId}: ${JSON.stringify({
      orderId: delivery.orderId,
      courierId: delivery.courierId,
      address: delivery.address,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt
    })}`);

    if (request.method === 'PATCH' && request.body.status) {
      this.logger.log(`Спроба зміни статусу доставки #${deliveryId} з '${delivery.status}' на '${request.body.status}'`);
    }

    response.on('finish', () => {
      this.logger.log(`Запит до доставки #${deliveryId} завершено зі статусом: ${response.statusCode}`);
    });

    request['delivery'] = delivery;
    next();
  }
}