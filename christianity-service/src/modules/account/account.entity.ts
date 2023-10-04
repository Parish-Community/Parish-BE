import { ShareBaseEntity } from 'src/core/base.entity';
import { GENDER } from 'src/core/constants';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity({
  name: 'account',
})
export class Account extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  phonenumber: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isValidOtp: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  firstLogin: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'int',
    nullable: true,
  })
  profileId: number;
  @ManyToOne(() => Profile, (profile) => profile.accounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: Profile;
}
