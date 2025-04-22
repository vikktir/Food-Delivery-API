import { Body, Controller, Get, Post, Patch, Delete, Param, Inject } from '@nestjs/common';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  async createOrder(
    @Body() orderData: Omit<Order, 'id' | 'status' | 'orderDate'>,
  ): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order | undefined> {
    return this.ordersService.getOrderByID(Number(id));
  }

  @Get(':id/status')
  async getOrderStatus(
    @Param('id') id: string,
  ): Promise<Order['status'] | undefined> {
    return this.ordersService.getOrderStatus(Number(id));
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: Order['status'],
  ): Promise<Order | undefined> {
    if (!status) {
      throw new Error('Status is required');
    }
    return this.ordersService.updateOrder(Number(id), { status });
  }

  @Patch(':id/address')
  async updateOrderAddress(
    @Param('id') id: string,
    @Body('address') address: string,
  ): Promise<Order | undefined> {
    if (!address) {
      throw new Error('Address is required');
    }
    return await this.ordersService.updateOrder(Number(id), { address });
  }

  @Delete(':id')
  async deleteOrderById(@Param('id') id: string):
    Promise<{order?:Order | null, message: string}> {
    const deletedOrder = await this.ordersService.deleteOrderById(Number(id));
    if (!deletedOrder) {
      return { order: null, message: "order not found" };
    }
    return { order: deletedOrder?.[0], message: "order successfully deleted" };
  }
}