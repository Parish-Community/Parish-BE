import { ShareBaseEntity } from '@/core/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Parishioner } from '../parishioner/parishioner.entity';
import { HouseHold } from '../house-hold/entities/house-hold.entity';

@Entity({
  name: 'parish_cluster',
})
export class ParishCluster extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  parish_clusterId: number;

  @OneToMany(() => Parishioner, (p) => p.parish_cluster)
  profiles: Parishioner[];

  @OneToMany(() => HouseHold, (p) => p.parish_cluster)
  houseHold: HouseHold[];
}
