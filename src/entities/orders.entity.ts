import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELED';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  costumerName: string;

  @Column()
  address: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('simple-array')
  items: string[];

  @Column({ type: 'enum', enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED'], default: 'PENDING' })
  status: OrderStatus;

  @CreateDateColumn()
  orderDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
