import { ShareBaseEntity } from '../../core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { GENDER, PARISH_CLUSTER } from '@/core/constants';

@Entity({
  name: 'marriage',
})
export class Marriage extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_email: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_father: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_mother: string;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  first_student_gender: GENDER;

  @Column({
    type: 'date',
    nullable: true,
  })
  first_student_DOB: Date;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'Tràng Lưu',
  })
  first_student_parish: string;

  @Column({
    type: 'enum',
    enum: PARISH_CLUSTER,
  })
  first_parish_cluster: PARISH_CLUSTER;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_address: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_email: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_father: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_mother: string;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  second_student_gender: GENDER;

  @Column({
    type: 'date',
    nullable: true,
  })
  second_student_DOB: Date;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'Tràng Lưu',
  })
  second_student_parish: string;

  @Column({
    type: 'enum',
    enum: PARISH_CLUSTER,
  })
  second_parish_cluster: PARISH_CLUSTER;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_address: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isAccept: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  accountId: number;
  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
