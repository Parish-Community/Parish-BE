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
import { COURSE_STATUS } from '@/core/constants';

@Entity({
  name: 'course',
})
export class Course extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  courseName: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: COURSE_STATUS,
    default: COURSE_STATUS.OPEN,
  })
  courseStatus: COURSE_STATUS;

  @Column({
    type: 'int',
    nullable: false,
  })
  createdBy: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 15,
  })
  totalMember: number;
}
