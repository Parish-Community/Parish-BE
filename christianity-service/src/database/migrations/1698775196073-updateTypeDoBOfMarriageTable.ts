import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypeDoBOfMarriageTable1698775196073 implements MigrationInterface {
    name = 'UpdateTypeDoBOfMarriageTable1698775196073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "second_parish_clusterId"`);
        await queryRunner.query(`CREATE TYPE "public"."marriage_second_parish_cluster_enum" AS ENUM('Tân Lộc', 'Tràng Thị', 'Tràng Lưu', 'Giang Lĩnh', 'Đồng Lưu', 'Đô Khê')`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "second_parish_cluster" "public"."marriage_second_parish_cluster_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "first_student_DOB"`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "first_student_DOB" date`);
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "second_student_DOB"`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "second_student_DOB" date`);
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "second_student_parish"`);
        await queryRunner.query(`DROP TYPE "public"."marriage_second_student_parish_enum"`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "second_student_parish" character varying(500) NOT NULL DEFAULT 'Tràng Lưu'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "second_student_parish"`);
        await queryRunner.query(`CREATE TYPE "public"."marriage_second_student_parish_enum" AS ENUM('Tân Lộc', 'Tràng Thị', 'Tràng Lưu', 'Giang Lĩnh', 'Đồng Lưu', 'Đô Khê')`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "second_student_parish" "public"."marriage_second_student_parish_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "second_student_DOB"`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "second_student_DOB" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "first_student_DOB"`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "first_student_DOB" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marriage" DROP COLUMN "second_parish_cluster"`);
        await queryRunner.query(`DROP TYPE "public"."marriage_second_parish_cluster_enum"`);
        await queryRunner.query(`ALTER TABLE "marriage" ADD "second_parish_clusterId" integer NOT NULL`);
    }

}
