import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfileandCourseTableRelationship1698822362291 implements MigrationInterface {
    name = 'UpdateProfileandCourseTableRelationship1698822362291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "profileId" integer`);
        await queryRunner.query(`CREATE TYPE "public"."profile_position_enum" AS ENUM('priest', 'monk', 'nun', 'christianity')`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "position" "public"."profile_position_enum"`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_d553986c71a014b84887615155b" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_d553986c71a014b84887615155b"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "position"`);
        await queryRunner.query(`DROP TYPE "public"."profile_position_enum"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "profileId"`);
    }

}
