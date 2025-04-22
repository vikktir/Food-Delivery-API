import { Inject, Injectable, Scope } from '@nestjs/common';
import { Order } from './orders.model';
import { LoggerService } from '../logger/logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class OrdersService {
  @Inject(LoggerService)
  private logger: LoggerService;

  private orders: Order[] = [];
  private idCounter = 1;

  async createOrder(
    orderData: Omit<Order, 'id' | 'status' | 'orderDate'>,
  ): Promise<Order> {
    const newOrder: Order = {
      id: this.idCounter++,
      status: 'PENDING',
      orderDate: new Date(Date.now()),
      ...orderData,
    };
    this.orders.push(newOrder);
    this.logger.log(`Order created: ${JSON.stringify(newOrder)}`);
    return newOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    this.logger.log('Getting all orders');
    return this.orders;
  }

  async getOrderByID(id: number): Promise<Order | undefined> {
    this.logger.log(`Getting order by id: ${id}`);
    return this.orders.find((order) => order.id === id);
  }

  async updateOrder(
    id: number,
    orderData: Partial<Omit<Order, 'id'>>,
  ): Promise<Order | undefined> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) return undefined;

    this.orders[orderIndex] = { ...this.orders[orderIndex], ...orderData };

    this.logger.log(
      `Order updated: ${JSON.stringify(this.orders[orderIndex])}`,
    );
    return this.orders[orderIndex];
  }

  async deleteOrderById(id: number): Promise<Order[] | null> {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) {
      this.logger.log(`Order not found: ${id}`);
      return null;
    }

    this.logger.log(`Order deleted: ${JSON.stringify(this.orders[index])}`);
    return this.orders.splice(index, 1);
  }
}
