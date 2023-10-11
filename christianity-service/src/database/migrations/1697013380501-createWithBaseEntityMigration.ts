import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWithBaseEntityMigration1697013380501
  implements MigrationInterface
{
  name = 'CreateWithBaseEntityMigration1697013380501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "share_base_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f17ce4c5e503f65d0cc177856ed" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "share_base_entity"`);
  }
}
