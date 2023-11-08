import { ShareBaseEntity } from '@/core/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ParishCluster } from '../../parish-cluster/parish-cluster.entity';
import { HouseHoldMember } from './house-hold-member.entity';

@Entity({
  name: 'house_hold',
})
export class HouseHold extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 9,
    unique: true,
  })
  houseHoldCode: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  address: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  parish_clusterId: number;
  @ManyToOne(() => ParishCluster, (p) => p.houseHold, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'parish_clusterId',
    referencedColumnName: 'parish_clusterId',
  })
  parish_cluster: ParishCluster[];

  @OneToMany(() => HouseHoldMember, (hMember) => hMember.house_holds)
  house_hold_members: HouseHoldMember[];
}
