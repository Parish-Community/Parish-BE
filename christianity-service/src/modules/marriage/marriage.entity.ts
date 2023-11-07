import { ShareBaseEntity } from '../../core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { GENDER, PARISH_CLUSTER } from '@/core/constants';
import { Course } from '../course/entities/course.entity';
import { Attendance } from '../course/entities/attendance.entity';

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

  @Column({
    type: 'int',
    nullable: true,
  })
  courseId: number;
  @ManyToOne(() => Course, (c) => c.marriages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId', referencedColumnName: 'id' })
  course: Course;

  @Column({ type: 'float', nullable: true })
  first_score: number | null;

  @Column({ type: 'float', nullable: true })
  second_score: number | null;

  @Column({ type: 'boolean', nullable: false, default: false })
  second_isCompleteCourse: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  first_isCompleteCourse: boolean;

  @OneToMany(() => Attendance, (attendance) => attendance.marriage)
  attendances: Attendance[];
}
