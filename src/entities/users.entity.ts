import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'USER' | 'ADMIN';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  })
  role: UserRole;
}
