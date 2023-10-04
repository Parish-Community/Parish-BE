import { ShareBaseEntity } from 'src/core/base.entity';
import { GENDER } from 'src/core/constants';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';

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
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  parish_cluster: string;

  @OneToMany(() => Account, (account) => account.profile)
  accounts: Account[];
}
