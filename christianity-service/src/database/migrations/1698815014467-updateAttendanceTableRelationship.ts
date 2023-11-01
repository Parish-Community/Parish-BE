import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAttendanceTableRelationship1698815014467
  implements MigrationInterface
{
  name = 'UpdateAttendanceTableRelationship1698815014467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_ee0ffe42c1f1a01e72b725c0cb2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ALTER COLUMN "courseId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_65fc53070de1fe3dc75014320d3" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_65fc53070de1fe3dc75014320d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ALTER COLUMN "courseId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_ee0ffe42c1f1a01e72b725c0cb2" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
