import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatenullforCourseCouplRegistrationTable1699935542022
  implements MigrationInterface
{
  name = 'UpdatenullforCourseCouplRegistrationTable1699935542022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP CONSTRAINT "FK_59dceeb44b7926d499a541c4b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ALTER COLUMN "courseId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD CONSTRAINT "FK_59dceeb44b7926d499a541c4b84" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP CONSTRAINT "FK_59dceeb44b7926d499a541c4b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ALTER COLUMN "courseId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD CONSTRAINT "FK_59dceeb44b7926d499a541c4b84" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
