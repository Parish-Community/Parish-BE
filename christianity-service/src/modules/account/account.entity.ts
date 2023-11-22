import { ShareBaseEntity } from '@/core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Parishioner } from '@/modules/parishioner/parishioner.entity';
import { Role } from '@/modules/role/role.entity';
import { Payment } from '../payments/payments.entity';
import { Baptism } from '../baptism/baptism.entity';

@Entity({
  name: 'account',
})
export class Account extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  phonenumber: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  christianName: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isValidOtp: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  parishionerId: number;
  @ManyToOne(() => Parishioner, (p) => p.accounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parishionerId', referencedColumnName: 'id' })
  parishioner: Parishioner;

  @Column({
    type: 'int',
    nullable: false,
  })
  roleId: number;
  @ManyToOne(() => Role, (role) => role.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: Role;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  refresh_token: string;

  @OneToMany(() => Payment, (payment) => payment.account)
  payments: Payment[];

  @OneToMany(() => Baptism, (b) => b.account)
  baptism: Baptism[];

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isRegisterMarriage: boolean;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    unique: true,
  })
  email: string;
}
