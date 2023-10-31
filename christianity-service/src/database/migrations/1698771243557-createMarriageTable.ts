import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMarriageTable1698771243557 implements MigrationInterface {
  name = 'CreateMarriageTable1698771243557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "marriage" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "first_student_name" character varying(500) NOT NULL, "first_student_email" character varying(500) NOT NULL, "first_student_father" character varying(500) NOT NULL, "first_student_mother" character varying(500) NOT NULL, "first_student_gender" character varying(500) NOT NULL, "first_student_DOB" character varying(500) NOT NULL, "first_student_parish" character varying(500) NOT NULL DEFAULT 'Tràng Lưu', "first_parish_clusterId" integer NOT NULL, "first_student_address" character varying(500) NOT NULL, "second_student_name" character varying(500) NOT NULL, "second_student_email" character varying(500) NOT NULL, "second_student_father" character varying(500) NOT NULL, "second_student_mother" character varying(500) NOT NULL, "second_student_gender" character varying(500) NOT NULL, "second_student_DOB" character varying(500) NOT NULL, "second_student_parish" character varying(500) NOT NULL DEFAULT 'Tràng Lưu', "second_parish_clusterId" integer NOT NULL, "second_student_address" character varying(500) NOT NULL, "isAccept" boolean NOT NULL DEFAULT false, "accountId" integer NOT NULL, CONSTRAINT "REL_06c1c1483dd79c23ac667553be" UNIQUE ("accountId"), CONSTRAINT "PK_0dfdecedb396f0e3ec3b2693a44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD CONSTRAINT "FK_06c1c1483dd79c23ac667553be7" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP CONSTRAINT "FK_06c1c1483dd79c23ac667553be7"`,
    );
    await queryRunner.query(`DROP TABLE "marriage"`);
  }
}
