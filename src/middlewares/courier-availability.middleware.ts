import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {DeliveryService} from '../delivery/delivery.service';

@Injectable()
export class CourierAvailabilityMiddleware implements NestMiddleware {
  constructor(private readonly deliveryService: DeliveryService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const courierId = Number(request.params.path[0]);

    if (!courierId) {
      return response.status(400).json({ message: 'Не вказан ID кур\'єра' });
    }

    const courier = await this.deliveryService.getCourierById(courierId);
    
    if (!courier) {
      return response.status(404).json({ message: 'Кур\'єр не знайдений' });
    }

    const isAvailable = await this.deliveryService.getCourierStatus(courierId) === 'free';

    if (!isAvailable) {
      return response.status(400).json({ message: 'Кур\'єр недоступний' });
    }

    request['courier'] = courier;
    next();
  }
}