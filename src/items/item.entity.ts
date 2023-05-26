import { User } from 'src/Users/user.entity';
import { StatusEnum, TypeEnum } from 'src/common/types';
import { JoinColumn, ManyToOne } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startPrice: number;

  @Column()
  currentPrice: number;

  @Column({ nullable: true })
  startDate: Date | null;

  @Column({ nullable: true })
  endDate: Date | null;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatetAt: Date;

  @Column({ default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @Column({ default: TypeEnum.DRAFT })
  type: TypeEnum;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => User, user => user.items)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
