import { Inject, Injectable} from '@nestjs/common';
import { Order } from './orders.model';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class OrdersService {
  @Inject(LoggerService)
  private logger: LoggerService;

  private orders: Order[] = [];
  private idCounter = 1;

  async createOrder(
    orderData: Omit<Order, 'id' | 'status' | 'orderDate' | 'updatedAt'>,
  ): Promise<Order> {
    const newOrder: Order = {
      id: this.idCounter++,
      status: 'PENDING',
      orderDate: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
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

  async getOrderStatus(id: number): Promise<Order['status'] | undefined> {
    const order = await this.getOrderByID(id);
    return order?.status;
  }

  async updateOrder(
    id: number,
    orderData: Partial<Omit<Order, 'id' | 'updatedAt'>>,
  ): Promise<Order | undefined> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) return undefined;

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      ...orderData,
      updatedAt: new Date(Date.now()),
    };

    this.logger.log(
      `Order updated at ${this.orders[orderIndex].updatedAt}: ${JSON.stringify(this.orders[orderIndex])}`,
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
