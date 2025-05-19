import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/orders.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly logger: LoggerService,
  ) {}

  async createOrder(data: Partial<Order>): Promise<Order> {
    const order = this.ordersRepository.create(data);
    const saved = await this.ordersRepository.save(order);
    this.logger.log(`Order created: ${JSON.stringify(saved)}`);
    return saved;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async getOrderByID(id: number): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  async getOrderStatus(id: number): Promise<Order['status'] | null> {
    const order = await this.getOrderByID(id);
    return order?.status ?? null;
  }

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order | null> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) return null;

    Object.assign(order, updates);
    return await this.ordersRepository.save(order);
  }

  async deleteOrderById(id: number): Promise<Order | null> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) return null;

    await this.ordersRepository.remove(order);
    return order;
  }
}
