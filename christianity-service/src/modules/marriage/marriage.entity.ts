import { ShareBaseEntity } from '../../core/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'marriage',
})
export class Marriage extends ShareBaseEntity {
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_email: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_father: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_mother: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_gender: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_DOB: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'Tràng Lưu',
  })
  first_student_parish: string;

  @Column()
  first_parish_clusterId: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  first_student_address: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_email: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_father: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_mother: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_gender: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_DOB: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'Tràng Lưu',
  })
  second_student_parish: string;

  @Column()
  second_parish_clusterId: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  second_student_address: string;
}
