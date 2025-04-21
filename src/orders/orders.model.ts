export class Order {
  id: number;
  costumerName: string;
  address: string;
  totalAmount: number;
  items: string[];
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELED';
  orderDate: Date;
}
