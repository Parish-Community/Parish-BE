import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddfieldAvatartInProfileTable1697351361337
  implements MigrationInterface
{
  name = 'AddfieldAvatartInProfileTable1697351361337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "avatar" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "avatar"`);
  }
}
