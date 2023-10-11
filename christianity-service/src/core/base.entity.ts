import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class ShareBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @CreateDateColumn({ select: true, name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ select: false, name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ select: true, name: 'deletedAt' })
  deletedAt: Date;
}
