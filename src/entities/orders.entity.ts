import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  costumerName: string;

  @Column()
  address: string;

  @Column('simple-array')
  items: string[];

  @Column()
  orderDate: Date;

  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

}