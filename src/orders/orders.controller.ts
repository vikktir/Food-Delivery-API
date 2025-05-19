import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  DefaultValuePipe,
  ForbiddenException,
  NotFoundException,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { OrderAlreadyProcessedException } from '../exceptions/order-already-processed.exception';
import { InvalidDeliveryAddressException } from '../exceptions/invalid-delivery-address.exception';
import { RoundPricePipe } from '../pipes/round-price.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LoggingTimeInterceptor } from '../interceptors/logging-time.interceptor';

@UseInterceptors(LoggingTimeInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('USER', 'ADMIN')
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createOrder(@Body(RoundPricePipe) orderDto: OrderDto) {
    return await this.ordersService.createOrder(orderDto);
  }

  @Roles('USER', 'ADMIN')
  @Get()
  async getOrders(
    @Query('deliveryType', new DefaultValuePipe('standard')) deliveryType: string,
  ) {
    return await this.ordersService.getAllOrders();
  }

  @Roles('USER', 'ADMIN')
  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.getOrderByID(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Roles('USER', 'ADMIN')
  @Get(':id/status')
  async getOrderStatus(@Param('id', ParseIntPipe) id: number) {
    const status = await this.ordersService.getOrderStatus(id);
    if (!status) throw new NotFoundException('Order not found');
    return { status };
  }

  @Roles('ADMIN')
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELED',
  ) {
    const order = await this.ordersService.getOrderByID(id);
    if (!order) throw new NotFoundException();
    if (order.status === 'COMPLETED') throw new OrderAlreadyProcessedException();
    return await this.ordersService.updateOrder(id, { status });
  }

  @Roles('USER', 'ADMIN')
  @Patch(':id/address')
  async updateOrderAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body('address') address: string,
  ) {
    if (!address || address.length < 5) throw new InvalidDeliveryAddressException();
    return await this.ordersService.updateOrder(id, { address });
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteOrderById(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.ordersService.deleteOrderById(id);
    if (!deleted) throw new ForbiddenException();
    return { order: deleted, message: 'Order deleted' };
  }
}
