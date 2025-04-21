import { Injectable } from '@nestjs/common';
import { Order } from './orders.model';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private idCounter = 1;

  async createOrder(orderData: Omit<Order, 'id' | 'status' | 'orderDate'>): Promise<Order> {
    const newOrder: Order = { id: this.idCounter++, status: 'PENDING',orderDate: new Date(Date.now()), ...orderData };
    this.orders.push(newOrder);
    return newOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orders;
  }

  async getOrderByID(id: number): Promise<Order | undefined> {
    return this.orders.find(order => order.id === id);
  }

  async updateOrder(id: number, orderData: Partial<Omit<Order,'id'>>): Promise<Order | undefined> {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if(orderIndex === -1) return undefined;

    this.orders[orderIndex] = { ...this.orders[orderIndex], ...orderData };
    return this.orders[orderIndex];
  }

  async deleteOrderById(id: number): Promise<Order[] | null> {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) {
      return null;
    }
    const deletedOrder = this.orders.splice(index, 1);
    return deletedOrder;
  }

}
