import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntityHouseHoldOfParish1699428226499
  implements MigrationInterface
{
  name = 'CreateEntityHouseHoldOfParish1699428226499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."house_hold_member_role_member_enum" AS ENUM('head', 'wife', 'son', 'daughter', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "house_hold_member" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "house_hold_Id" integer NOT NULL, "house_hold_member_Id" integer NOT NULL, "role_member" "public"."house_hold_member_role_member_enum" NOT NULL, CONSTRAINT "PK_6c4fdc2775732854e67180aa2cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "house_hold" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "houseHoldCode" character varying(9) NOT NULL, "address" character varying(500) NOT NULL, "parish_clusterId" integer NOT NULL, CONSTRAINT "UQ_45dc0553c50462cdd141efd87f2" UNIQUE ("houseHoldCode"), CONSTRAINT "PK_e7f3f7e2cdda2a9c575a2e6d219" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_hold_member" ADD CONSTRAINT "FK_e69ce67a5659d2804ba3831c7d4" FOREIGN KEY ("house_hold_Id") REFERENCES "house_hold"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_hold_member" ADD CONSTRAINT "FK_2ac5b24baf1cfe6e13c152a0b92" FOREIGN KEY ("house_hold_member_Id") REFERENCES "parishioner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_hold" ADD CONSTRAINT "FK_9d4daaa1c27c63e56bb374a94cc" FOREIGN KEY ("parish_clusterId") REFERENCES "parish_cluster"("parish_clusterId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "house_hold" DROP CONSTRAINT "FK_9d4daaa1c27c63e56bb374a94cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_hold_member" DROP CONSTRAINT "FK_2ac5b24baf1cfe6e13c152a0b92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_hold_member" DROP CONSTRAINT "FK_e69ce67a5659d2804ba3831c7d4"`,
    );
    await queryRunner.query(`DROP TABLE "house_hold"`);
    await queryRunner.query(`DROP TABLE "house_hold_member"`);
    await queryRunner.query(
      `DROP TYPE "public"."house_hold_member_role_member_enum"`,
    );
  }
}
