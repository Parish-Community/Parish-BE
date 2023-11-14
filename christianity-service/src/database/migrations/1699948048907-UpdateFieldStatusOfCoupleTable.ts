import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldStatusOfCoupleTable1699948048907 implements MigrationInterface {
    name = 'UpdateFieldStatusOfCoupleTable1699948048907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "couple_registration" DROP COLUMN "isAccept"`);
        await queryRunner.query(`ALTER TABLE "couple_registration" DROP COLUMN "isReject"`);
        await queryRunner.query(`ALTER TABLE "couple_registration" DROP COLUMN "isCompleteCourse"`);
        await queryRunner.query(`CREATE TYPE "public"."couple_registration_status_enum" AS ENUM('pending', 'accept', 'reject', 'completed')`);
        await queryRunner.query(`ALTER TABLE "couple_registration" ADD "status" "public"."couple_registration_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "couple_registration" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."couple_registration_status_enum"`);
        await queryRunner.query(`ALTER TABLE "couple_registration" ADD "isCompleteCourse" boolean`);
        await queryRunner.query(`ALTER TABLE "couple_registration" ADD "isReject" boolean`);
        await queryRunner.query(`ALTER TABLE "couple_registration" ADD "isAccept" boolean DEFAULT false`);
    }

}
