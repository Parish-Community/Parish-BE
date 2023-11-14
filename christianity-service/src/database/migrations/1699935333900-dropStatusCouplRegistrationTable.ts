import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropStatusCouplRegistrationTable1699935333900
  implements MigrationInterface
{
  name = 'DropStatusCouplRegistrationTable1699935333900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "status"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "status" character varying(500) NOT NULL`,
    );
  }
}
