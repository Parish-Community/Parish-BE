import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseTableandAttendanceTable1698813349011
  implements MigrationInterface
{
  name = 'CreateCourseTableandAttendanceTable1698813349011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "courseName" character varying(500) NOT NULL, "startDate" date NOT NULL, "endDate" date, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."attendance_status_enum" AS ENUM('absent', 'present', 'leave')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "date" date NOT NULL, "status" "public"."attendance_status_enum" NOT NULL, "note" character varying(500) NOT NULL, "accountId" integer NOT NULL, "courseId" integer, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "marriage" ADD "courseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "first_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "second_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "second_isCompleteCourse" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "first_isCompleteCourse" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD CONSTRAINT "FK_0dfdecedb396f0e3ec3b2693a44" FOREIGN KEY ("id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_ee0ffe42c1f1a01e72b725c0cb2" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_ee0ffe42c1f1a01e72b725c0cb2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP CONSTRAINT "FK_0dfdecedb396f0e3ec3b2693a44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "first_isCompleteCourse"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "second_isCompleteCourse"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "second_score"`,
    );
    await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "first_score"`);
    await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "courseId"`);
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
    await queryRunner.query(`DROP TABLE "course"`);
  }
}
