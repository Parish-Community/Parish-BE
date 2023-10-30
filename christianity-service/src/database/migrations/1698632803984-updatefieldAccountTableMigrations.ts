import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatefieldAccountTableMigrations1698632803984
  implements MigrationInterface
{
  name = 'UpdatefieldAccountTableMigrations1698632803984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "fullname" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD "refresh_token" character varying(500) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP COLUMN "refresh_token"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "fullname"`);
  }
}
