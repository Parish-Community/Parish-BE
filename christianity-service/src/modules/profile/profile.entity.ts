import { ShareBaseEntity } from '../../core/base.entity';
import { GENDER, POSITION_PARISH } from '../../core/constants';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Account } from '../../modules/account/account.entity';
import { ParishCluster } from '../parish_cluster/parish_cluster.entity';
import { Course } from '../course/entities/course.entity';

@Entity({
  name: 'profile',
})
export class Profile extends ShareBaseEntity {
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
    length: 500,
    nullable: false,
  })
  god_parent: string;

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
  })
  diocese: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
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
  })
  position: POSITION_PARISH;

  @OneToMany(() => Course, (course) => course.profile)
  course: Course[];

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isBaptism: boolean;

  @Column({
    type: 'date',
    nullable: false,
  })
  dateBaptism: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  locationBaptismId: number;
  @ManyToOne(() => ParishCluster, (parish_cluster) => parish_cluster.profiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'parish_clusterId',
    referencedColumnName: 'parish_clusterId',
  })
  locationBaptism: ParishCluster;
}
