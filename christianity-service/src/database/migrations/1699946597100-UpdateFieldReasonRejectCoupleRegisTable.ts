import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFieldReasonRejectCoupleRegisTable1699946597100
  implements MigrationInterface
{
  name = 'UpdateFieldReasonRejectCoupleRegisTable1699946597100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "rejectReason" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "rejectReason"`,
    );
  }
}
