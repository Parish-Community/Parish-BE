import { ACCOUNT_ROLE } from '@/core/constants';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoleData1697013724307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO "role"("name", "roleId") VALUES ($1,$2),($3,$4)',
      [ACCOUNT_ROLE.ADM, 1, ACCOUNT_ROLE.USER, 2],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "role" WHERE "name" IN ($1,$2)', [
      ACCOUNT_ROLE.ADM,
      ACCOUNT_ROLE.USER,
    ]);
  }
}
