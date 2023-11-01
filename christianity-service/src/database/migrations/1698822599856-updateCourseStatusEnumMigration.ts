import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCourseStatusEnumMigration1698822599856 implements MigrationInterface {
    name = 'UpdateCourseStatusEnumMigration1698822599856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."course_coursestatus_enum" AS ENUM('open', 'close')`);
        await queryRunner.query(`ALTER TABLE "course" ADD "courseStatus" "public"."course_coursestatus_enum" NOT NULL DEFAULT 'open'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "courseStatus"`);
        await queryRunner.query(`DROP TYPE "public"."course_coursestatus_enum"`);
    }

}
