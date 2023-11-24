import { ShareBaseEntity } from '@/core/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { ParishCluster } from '../parish-cluster/parish-cluster.entity';
import { Parishioner } from '../parishioner/parishioner.entity';

@Entity({
  name: 'baptism',
})
export class Baptism extends ShareBaseEntity {
  @Column({
    type: 'date',
    nullable: true,
  })
  dateBaptism: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  parish_clusterId: number;
  @ManyToOne(() => ParishCluster, (parish_cluster) => parish_cluster.baptism, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'parish_clusterId',
    referencedColumnName: 'parish_clusterId',
  })
  parish_cluster: ParishCluster;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  priestBaptism: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isAccepted: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  accountId: number;
  @ManyToOne(() => Account, (account) => account.baptism, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  account: Account;

  @Column({
    type: 'int',
    nullable: false,
  })
  parishionerId: number;
  @OneToOne(() => Parishioner, (p) => p.baptism, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parishionerId', referencedColumnName: 'id' })
  parishioner: Parishioner;
}
