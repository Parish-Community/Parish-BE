import { ShareBaseEntity } from '@/core/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Marriage } from '../marriage/marriage.entity';

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

  @OneToMany(() => Profile, (profile) => profile.parish_cluster)
  profiles: Profile[];
}
