import {Injectable} from '@nestjs/common';
import {Delivery} from './delivery.model';
import {Courier} from './courier.model';

@Injectable()
export class DeliveryService {
  private couriers: Courier[] = [];
  private deliveries: Delivery[] = [];
  private deliveryIdCounter = 1;
  private courierIdCounter = 1;

  // Методы для работы с курьерами
  async createCourier(courierData: Omit<Courier, 'id' | "status">): Promise<{courier?: Courier | null, message: string}> {
    const newCourier: Courier = {id: this.courierIdCounter++, status: "free",...courierData};
    this.couriers.push(newCourier);
    return {courier: newCourier, message: "Created courier successfully"};
  }

  async getAllCouriers(): Promise<Courier[]> {
    return this.couriers;
  }

  async getCourierById(id: number): Promise<Courier | undefined> {
    return this.couriers.find(courier => courier.id === id);
  }

  async getCourierStatus(id: number): Promise<Courier['status'] | undefined> {
    return this.couriers.find(courier => courier.id === id)?.status;
  }

  async updateCourier(id: number, courierData: Partial<Omit<Courier, 'id'>>): Promise<Courier | undefined> {
    const courierIndex = this.couriers.findIndex(courier => courier.id === id);
    if (courierIndex === -1) return undefined;
    this.couriers[courierIndex] = { ...this.couriers[courierIndex], ...courierData };
    return this.couriers[courierIndex];
  }

  async deleteCourierById(id: number): Promise<{courier?: Courier | null, message: string}> {
    const index = this.couriers.findIndex(courier => courier.id === id);
    if (index === -1) return {courier: null, message: 'Courier not found'};
    const [deletedCourier] = this.couriers.splice(index, 1);
    return {courier: deletedCourier, message: 'Courier deleted'};
  }

  async createDelivery(deliveryData: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'| 'status'>): Promise<{delivery?: Delivery | null, message: string}> {
    const newDelivery: Delivery = {
      id: this.deliveryIdCounter++,
      ...deliveryData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending'
    };
    this.deliveries.push(newDelivery);
    return {delivery: newDelivery, message: "Created delivery successfully"};
  }

  async getAllDeliveries(): Promise<Delivery[]> {
    return this.deliveries;
  }

  async getDeliveryById(id: number): Promise<Delivery | undefined> {
    return this.deliveries.find(delivery => delivery.id === id);
  }

  async updateDelivery(id: number, deliveryData: Partial<Omit<Delivery, 'id' | 'createdAt'>>): Promise<Delivery | undefined> {
    const deliveryIndex = this.deliveries.findIndex(delivery => delivery.id === id);
    if (deliveryIndex === -1) return undefined;
    this.deliveries[deliveryIndex] = {
      ...this.deliveries[deliveryIndex],
      ...deliveryData,
      updatedAt: new Date()
    };
    return this.deliveries[deliveryIndex];
  }

  async deleteDeliveryById(id: number): Promise<{delivery?: Delivery | null, message: string}> {
    const index = this.deliveries.findIndex(delivery => delivery.id === id);
    if (index === -1) return {delivery: null, message: 'Delivery not found'};
    const [deletedDelivery] = this.deliveries.splice(index, 1);
    return {delivery: deletedDelivery, message: 'Delivery deleted'};
  }
}