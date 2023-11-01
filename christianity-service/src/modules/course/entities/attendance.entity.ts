import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ShareBaseEntity } from '../../../core/base.entity';
import { Account } from '../../account/account.entity';
import { ATTENDANCE_STATUS } from '@/core/constants';
import { Course } from './course.entity';

@Entity({
  name: 'attendance',
})
export class Attendance extends ShareBaseEntity {
  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: ATTENDANCE_STATUS,
  })
  status: ATTENDANCE_STATUS;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  note: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  accountId: number;
  @ManyToOne(() => Account, (account) => account.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  account: Account;

  @Column({
    type: 'int',
    nullable: false,
  })
  courseId: number;
  @ManyToOne(() => Course, (course) => course.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId', referencedColumnName: 'id' })
  course: Course;
}
