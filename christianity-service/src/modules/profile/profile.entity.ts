import { ShareBaseEntity } from '@/core/base.entity';
import { GENDER } from '@/core/constants';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Account } from '@/modules/account/account.entity';
import { ParishCluster } from '../parish_cluster/parish_cluster.entity';

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
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    unique: true,
  })
  phonenumber: string;

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
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isRequestAccount: boolean;

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

  @OneToMany(() => Account, (account) => account.profile)
  accounts: Account[];
}
