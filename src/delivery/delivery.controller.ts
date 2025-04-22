import {Controller, Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';
import {DeliveryService} from './delivery.service';
import {Courier} from './courier.model';
import {Delivery} from './delivery.model';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('couriers/create')
  async createCourier(
    @Body() courierData: Omit<Courier, 'id' | 'status'>,
  ): Promise<{ courier?: Courier | null; message: string }> {
    return this.deliveryService.createCourier(courierData);
  }

  @Get('couriers')
  async getAllCouriers(): Promise<Courier[]> {
    return this.deliveryService.getAllCouriers();
  }

  @Get('couriers/:id')
  async getCourierById(@Param('id') id: string): Promise<Courier | undefined> {
    return this.deliveryService.getCourierById(Number(id));
  }

  @Get('couriers/:id/status')
  async getCourierStatus(@Param('id') id: string): Promise<Courier['status'] | undefined> {
    return this.deliveryService.getCourierStatus(Number(id));
  }

  @Patch('couriers/:id')
  async updateCourier(
    @Param('id') id: string,
    @Body() courierData: Partial<Omit<Courier, 'id'>>,
  ): Promise<Courier | undefined> {
    return this.deliveryService.updateCourier(Number(id), courierData);
  }

  @Delete('couriers/:id')
  async deleteCourierById(@Param('id') id: string): Promise<{ courier?: Courier | null; message: string }> {
    return this.deliveryService.deleteCourierById(Number(id));
  }

  // Методы для работы с доставками
  @Post('create')
  async createDelivery(
    @Body() deliveryData: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<{ delivery?: Delivery | null; message: string }> {
    return this.deliveryService.createDelivery(deliveryData);
  }

  @Get()
  async getAllDeliveries(): Promise<Delivery[]> {
    return this.deliveryService.getAllDeliveries();
  }

  @Get(':id')
  async getDeliveryById(@Param('id') id: string): Promise<Delivery | undefined> {
    return this.deliveryService.getDeliveryById(Number(id));
  }

  @Patch(':id')
  async updateDelivery(
    @Param('id') id: string,
    @Body() deliveryData: Partial<Omit<Delivery, 'id' | 'createdAt'>>,
  ): Promise<Delivery | undefined> {
    return this.deliveryService.updateDelivery(Number(id), deliveryData);
  }

  @Delete(':id')
  async deleteDeliveryById(@Param('id') id: string): Promise<{ delivery?: Delivery | null; message: string }> {
    return this.deliveryService.deleteDeliveryById(Number(id));
  }
}