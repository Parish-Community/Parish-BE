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
  fullname: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    unique: true,
  })
  email: string;

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
    default: false,
  })
  firstLogin: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'int',
    nullable: true,
  })
  profileId: number;
  @ManyToOne(() => Profile, (profile) => profile.accounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: Profile;

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

  @OneToMany(() => Attendance, (attendance) => attendance.account)
  attendances: Attendance[];
}
