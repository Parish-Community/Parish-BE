import { ShareBaseEntity } from '@/core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from '@/modules/profile/profile.entity';
import { Role } from '@/modules/role/role.entity';
import { Marriage } from '../marriage/marriage.entity';
import { Attendance } from '../course/entities/attendance.entity';
import { Payment } from '../payments/payments.entity';

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
  payments: Attendance[];

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
}
