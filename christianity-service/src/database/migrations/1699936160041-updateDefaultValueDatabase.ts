import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDefaultValueDatabase1699936160041
  implements MigrationInterface
{
  name = 'UpdateDefaultValueDatabase1699936160041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parishioner" ALTER COLUMN "diocese" SET DEFAULT 'Hà Tĩnh'`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" ALTER COLUMN "parish" SET DEFAULT 'Tràng Lưu'`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" ALTER COLUMN "position" SET DEFAULT 'christianity'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parishioner" ALTER COLUMN "position" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" ALTER COLUMN "parish" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" ALTER COLUMN "diocese" DROP DEFAULT`,
    );
  }
}
