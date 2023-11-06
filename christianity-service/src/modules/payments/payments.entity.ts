import { ShareBaseEntity } from '@/core/base.entity';
import { Currency, PaymentStatus } from '@/core/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity({
  name: 'payment',
})
export class Payment extends ShareBaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  public stripeSessionId: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  public paymentStatus: PaymentStatus;

  @CreateDateColumn()
  public initiatedAt: Date;

  @Column()
  public amount: number;

  @CreateDateColumn({
    nullable: true,
  })
  public finalisedAt: Date;

  @Column({
    type: 'enum',
    enum: Currency,
  })
  public currency: Currency;

  @Column({
    type: 'int',
    nullable: true,
  })
  accountId: number;
  @ManyToOne(() => Account, (account) => account.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  public account: Account;
}
