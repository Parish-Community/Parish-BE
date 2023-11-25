import { ShareBaseEntity } from '../../../core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Account } from '../../account/account.entity';
import { Parishioner } from '@/modules/parishioner/parishioner.entity';
import { COURSE_STATUS, GENDER, STATUS_COUPLE } from '@/core/constants';
import { Course } from './course.entity';

@Entity({
  name: 'couple_registration',
})
export class CoupleRegistration extends ShareBaseEntity {
  @Column({
    type: 'int',
    nullable: false,
  })
  partner1Id: number;
  @ManyToOne(() => Parishioner, (p) => p.courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partner1Id', referencedColumnName: 'id' })
  parishioner1: Parishioner;

  @Column({
    type: 'int',
    nullable: false,
  })
  partner2Id: number;
  @ManyToOne(() => Parishioner, (p) => p.courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partner2Id', referencedColumnName: 'id' })
  parishioner2: Parishioner;

  @Column({
    type: 'int',
    nullable: true,
  })
  courseId: number;
  @ManyToOne(() => Course, (course) => course.coupleRegistration, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId', referencedColumnName: 'id' })
  course: Course;

  @Column({
    type: 'enum',
    enum: STATUS_COUPLE,
    default: STATUS_COUPLE.PENDING,
  })
  status: STATUS_COUPLE;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  rejectReason: string;
}
