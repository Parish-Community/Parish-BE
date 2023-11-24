import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableBaptimsMigration1700635995157
  implements MigrationInterface
{
  name = 'AddTableBaptimsMigration1700635995157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "baptism" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "parishionerId" integer NOT NULL, "dateBaptism" date, "parish_clusterId" integer, "priestBaptism" character varying(100), "isAccepted" boolean NOT NULL DEFAULT false, "accountId" integer NOT NULL, CONSTRAINT "PK_f7d87aed1e1afc275969531fba5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" ADD "god_parent" character varying(500)`,
    );
    await queryRunner.query(
      `ALTER TABLE "baptism" ADD CONSTRAINT "FK_feb5c84c938d72468b82fdaccfc" FOREIGN KEY ("parish_clusterId") REFERENCES "parish_cluster"("parish_clusterId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "baptism" ADD CONSTRAINT "FK_1f143d462f9dae394d6e43150ff" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "baptism" DROP CONSTRAINT "FK_1f143d462f9dae394d6e43150ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "baptism" DROP CONSTRAINT "FK_feb5c84c938d72468b82fdaccfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" DROP COLUMN "god_parent"`,
    );
    await queryRunner.query(`DROP TABLE "baptism"`);
  }
}
