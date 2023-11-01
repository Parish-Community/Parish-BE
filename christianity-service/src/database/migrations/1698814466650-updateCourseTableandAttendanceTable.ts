import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCourseTableandAttendanceTable1698814466650
  implements MigrationInterface
{
  name = 'UpdateCourseTableandAttendanceTable1698814466650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP CONSTRAINT "FK_0dfdecedb396f0e3ec3b2693a44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD CONSTRAINT "FK_4770cb51205d54a36cd7ec880c2" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP CONSTRAINT "FK_4770cb51205d54a36cd7ec880c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD CONSTRAINT "FK_0dfdecedb396f0e3ec3b2693a44" FOREIGN KEY ("id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
