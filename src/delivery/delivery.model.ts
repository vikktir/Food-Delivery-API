export interface Delivery {
  id: number;
  orderId: number;
  courierId: number;
  status: 'pending' | 'in_progress' | 'delivered' | 'cancelled';
  address: string;
  createdAt: Date;
  updatedAt: Date;
}