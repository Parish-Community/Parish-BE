import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdRegisterPartnercouplRegistrationTable1699935271082
  implements MigrationInterface
{
  name = 'AddIdRegisterPartnercouplRegistrationTable1699935271082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_christianName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_fullname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_gender"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."couple_registration_partner2_gender_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_dateOfBirth"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_name_father"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_name_mother"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP CONSTRAINT "UQ_b583c0b9af05b56724def2b3601"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_phonenumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_avatar"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP CONSTRAINT "UQ_b1f78bb547814e5a07025550b8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "partner2_parish_clusterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "status" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "courseId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "isAccept" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "isReject" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "isCompleteCourse" boolean`,
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
      `ALTER TABLE "couple_registration" DROP COLUMN "isCompleteCourse"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "isReject"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "isAccept"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "courseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_parish_clusterId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_address" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_email" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD CONSTRAINT "UQ_b1f78bb547814e5a07025550b8d" UNIQUE ("partner2_email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_avatar" character varying(500)`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_phonenumber" character varying(10)`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD CONSTRAINT "UQ_b583c0b9af05b56724def2b3601" UNIQUE ("partner2_phonenumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_name_mother" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_name_father" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_dateOfBirth" date NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."couple_registration_partner2_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_gender" "public"."couple_registration_partner2_gender_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_fullname" character varying(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD "partner2_christianName" character varying(500) NOT NULL`,
    );
  }
}
