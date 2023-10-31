import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMagrriageTableRelationship1698773075899
  implements MigrationInterface
{
  name = 'UpdateMagrriageTableRelationship1698773075899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "first_parish_clusterId"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marriage_first_parish_cluster_enum" AS ENUM('Tân Lộc', 'Tràng Thị', 'Tràng Lưu', 'Giang Lĩnh', 'Đồng Lưu', 'Đô Khê')`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "first_parish_cluster" "public"."marriage_first_parish_cluster_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "first_student_gender"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marriage_first_student_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "first_student_gender" "public"."marriage_first_student_gender_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "second_student_gender"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marriage_second_student_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "second_student_gender" "public"."marriage_second_student_gender_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "second_student_parish"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marriage_second_student_parish_enum" AS ENUM('Tân Lộc', 'Tràng Thị', 'Tràng Lưu', 'Giang Lĩnh', 'Đồng Lưu', 'Đô Khê')`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "second_student_parish" "public"."marriage_second_student_parish_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "second_student_parish"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_second_student_parish_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "second_student_parish" character varying(500) NOT NULL DEFAULT 'Tràng Lưu'`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "second_student_gender"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_second_student_gender_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "second_student_gender" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "first_student_gender"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_first_student_gender_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "first_student_gender" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP COLUMN "first_parish_cluster"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_first_parish_cluster_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" ADD "first_parish_clusterId" integer NOT NULL`,
    );
  }
}
