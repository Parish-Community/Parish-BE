import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNullRefreshTokenAccountTable1698634189447
  implements MigrationInterface
{
  name = 'UpdateNullRefreshTokenAccountTable1698634189447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "refresh_token" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "refresh_token" SET NOT NULL`,
    );
  }
}
