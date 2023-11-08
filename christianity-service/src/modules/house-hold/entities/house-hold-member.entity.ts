import { ShareBaseEntity } from '@/core/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ACCOUNT_ROLE, RoleHouseMember } from '@/core/constants';
import { HouseHold } from './house-hold.entity';
import { Parishioner } from '@/modules/parishioner/parishioner.entity';

@Entity({
  name: 'house_hold_member',
})
export class HouseHoldMember extends ShareBaseEntity {
  @Column({
    type: 'int',
    nullable: false,
  })
  house_hold_Id: number;

  @ManyToOne(() => HouseHold, (h) => h.house_hold_members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'house_hold_Id',
    referencedColumnName: 'id',
  })
  house_holds: HouseHold[];

  @Column({
    type: 'int',
    nullable: false,
  })
  house_hold_member_Id: number;
  @ManyToOne(() => Parishioner, (p) => p.houseHoldMember, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'house_hold_member_Id',
    referencedColumnName: 'id',
  })
  parishioner: Parishioner[];

  @Column({
    type: 'enum',
    enum: RoleHouseMember,
  })
  role_member: RoleHouseMember;
}
