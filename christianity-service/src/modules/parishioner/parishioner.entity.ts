import { ShareBaseEntity } from '../../core/base.entity';
import { GENDER, POSITION_PARISH } from '../../core/constants';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';
import { ParishCluster } from '../parish-cluster/parish-cluster.entity';
import { Course } from '../course/entities/course.entity';
import { HouseHold } from '../house-hold/entities/house-hold.entity';
import { HouseHoldMember } from '../house-hold/entities/house-hold-member.entity';
import { CoupleRegistration } from '../course/entities/couple-registration.entity';

@Entity({
  name: 'parishioner',
})
export class Parishioner extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  christianName: string;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column({
    type: 'date',
    nullable: false,
  })
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  name_father: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  name_mother: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    unique: true,
  })
  phonenumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'Hà Tĩnh',
  })
  diocese: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'Tràng Lưu',
  })
  parish: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  parish_clusterId: number;
  @ManyToOne(() => ParishCluster, (parish_cluster) => parish_cluster.profiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'parish_clusterId',
    referencedColumnName: 'parish_clusterId',
  })
  parish_cluster: ParishCluster;

  @Column({
    type: 'enum',
    nullable: true,
    enum: POSITION_PARISH,
    default: POSITION_PARISH.CHRISTIANITY,
  })
  position: POSITION_PARISH;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isReqAccount: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isMarried: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isReqMarriageCatechism: boolean;

  @OneToMany(() => Account, (account) => account.parishioner)
  accounts: Account[];

  @OneToMany(() => HouseHoldMember, (hMember) => hMember.parishioner)
  houseHoldMember: HouseHoldMember[];

  @OneToMany(() => Course, (course) => course.parishioner)
  courses: Course[];

  @OneToMany(() => CoupleRegistration, (cr) => cr.parishioner1)
  coupleRegistration1: CoupleRegistration[];

  @OneToMany(() => CoupleRegistration, (cr) => cr.parishioner2)
  coupleRegistration2: CoupleRegistration[];
}
