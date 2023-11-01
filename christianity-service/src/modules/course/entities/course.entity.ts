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
import { Marriage } from '@/modules/marriage/marriage.entity';
import { Attendance } from './attendance.entity';
import { Profile } from '@/modules/profile/profile.entity';
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

  @OneToMany(() => Marriage, (m) => m.course)
  marriages: Marriage[];

  @OneToMany(() => Attendance, (attendance) => attendance.course)
  attendances: Attendance[];

  @Column({
    type: 'enum',
    enum: COURSE_STATUS,
    default: COURSE_STATUS.OPEN,
  })
  courseStatus: COURSE_STATUS;

  @Column({
    type: 'int',
    nullable: true,
  })
  profileId: number;
  @ManyToOne(() => Profile, (profile) => profile.course, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: Profile;
}
