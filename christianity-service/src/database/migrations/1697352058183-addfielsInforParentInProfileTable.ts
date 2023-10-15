import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddfielsInforParentInProfileTable1697352058183
  implements MigrationInterface
{
  name = 'AddfielsInforParentInProfileTable1697352058183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "name_father" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "name_mother" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "god_parent" character varying(500) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "god_parent"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "name_mother"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "name_father"`);
  }
}
