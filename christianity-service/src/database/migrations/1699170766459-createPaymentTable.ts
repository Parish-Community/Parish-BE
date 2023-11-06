import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentTable1699170766459 implements MigrationInterface {
  name = 'CreatePaymentTable1699170766459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TYPE "public"."marriage_first_student_gender_enum" AS ENUM('male', 'female')`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."marriage_first_parish_cluster_enum" AS ENUM('Tân Lộc', 'Tràng Thị', 'Tràng Lưu', 'Giang Lĩnh', 'Đồng Lưu', 'Đô Khê')`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."marriage_second_student_gender_enum" AS ENUM('male', 'female')`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."marriage_second_parish_cluster_enum" AS ENUM('Tân Lộc', 'Tràng Thị', 'Tràng Lưu', 'Giang Lĩnh', 'Đồng Lưu', 'Đô Khê')`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "marriage" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "first_student_name" character varying(500) NOT NULL, "first_student_email" character varying(500) NOT NULL, "first_student_father" character varying(500) NOT NULL, "first_student_mother" character varying(500) NOT NULL, "first_student_gender" "public"."marriage_first_student_gender_enum" NOT NULL, "first_student_DOB" date, "first_student_parish" character varying(500) NOT NULL DEFAULT 'Tràng Lưu', "first_parish_cluster" "public"."marriage_first_parish_cluster_enum" NOT NULL, "first_student_address" character varying(500) NOT NULL, "second_student_name" character varying(500) NOT NULL, "second_student_email" character varying(500) NOT NULL, "second_student_father" character varying(500) NOT NULL, "second_student_mother" character varying(500) NOT NULL, "second_student_gender" "public"."marriage_second_student_gender_enum" NOT NULL, "second_student_DOB" date, "second_student_parish" character varying(500) NOT NULL DEFAULT 'Tràng Lưu', "second_parish_cluster" "public"."marriage_second_parish_cluster_enum" NOT NULL, "second_student_address" character varying(500) NOT NULL, "isAccept" boolean NOT NULL DEFAULT false, "accountId" integer NOT NULL, "courseId" integer, "first_score" double precision, "second_score" double precision, "second_isCompleteCourse" boolean NOT NULL DEFAULT false, "first_isCompleteCourse" boolean NOT NULL DEFAULT false, CONSTRAINT "REL_06c1c1483dd79c23ac667553be" UNIQUE ("accountId"), CONSTRAINT "PK_0dfdecedb396f0e3ec3b2693a44" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."attendance_status_enum" AS ENUM('absent', 'present', 'leave')`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "date" date NOT NULL, "status" "public"."attendance_status_enum" NOT NULL, "note" character varying(500) NOT NULL, "accountId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."course_coursestatus_enum" AS ENUM('open', 'close')`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "course" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "courseName" character varying(500) NOT NULL, "startDate" date NOT NULL, "endDate" date, "courseStatus" "public"."course_coursestatus_enum" NOT NULL DEFAULT 'open', "profileId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."profile_gender_enum" AS ENUM('male', 'female')`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."profile_position_enum" AS ENUM('priest', 'monk', 'nun', 'christianity')`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "fullname" character varying(500) NOT NULL, "christianName" character varying(100) NOT NULL, "gender" "public"."profile_gender_enum" NOT NULL, "dateOfBirth" date, "name_father" character varying(500) NOT NULL, "name_mother" character varying(500) NOT NULL, "god_parent" character varying(500) NOT NULL, "phonenumber" character varying(10), "avatar" character varying(500), "address" character varying(500) NOT NULL, "diocese" character varying(500) NOT NULL, "parish" character varying(500) NOT NULL, "isRequestAccount" boolean NOT NULL DEFAULT false, "parish_clusterId" integer NOT NULL, "position" "public"."profile_position_enum", CONSTRAINT "UQ_0f6860fa849deb3bcf2baaf2fde" UNIQUE ("phonenumber"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `CREATE TYPE "public"."role_name_enum" AS ENUM('admin', 'user')`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" "public"."role_name_enum" NOT NULL DEFAULT 'user', "roleId" integer NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "UQ_703705ba862c2bb45250962c9e1" UNIQUE ("roleId"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    // );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_paymentstatus_enum" AS ENUM('pending', 'cancelled', 'paid')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_currency_enum" AS ENUM('usd')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "stripeSessionId" character varying NOT NULL, "description" character varying(500), "paymentStatus" "public"."payment_paymentstatus_enum" NOT NULL DEFAULT 'pending', "initiatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "finalisedAt" TIMESTAMP DEFAULT now(), "currency" "public"."payment_currency_enum" NOT NULL, "accountId" integer, CONSTRAINT "UQ_4f1a3ee2c5a576a7588bd4cf7ed" UNIQUE ("stripeSessionId"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    // await queryRunner.query(
    //   `CREATE TABLE "account" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "phonenumber" character varying(10) NOT NULL, "fullname" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, "isValidOtp" boolean NOT NULL DEFAULT false, "firstLogin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "profileId" integer, "roleId" integer NOT NULL, "refresh_token" character varying(500), CONSTRAINT "UQ_cf18095b79d00bb4b9062a4a1fb" UNIQUE ("phonenumber"), CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "marriage" ADD CONSTRAINT "FK_06c1c1483dd79c23ac667553be7" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "marriage" ADD CONSTRAINT "FK_4770cb51205d54a36cd7ec880c2" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "attendance" ADD CONSTRAINT "FK_65fc53070de1fe3dc75014320d3" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "attendance" ADD CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "course" ADD CONSTRAINT "FK_d553986c71a014b84887615155b" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "profile" ADD CONSTRAINT "FK_bb11bba4ef2fa7eeadb18d36d98" FOREIGN KEY ("parish_clusterId") REFERENCES "parish_cluster"("parish_clusterId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_25ee41d829b06c6e7451b89037f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE "account" ADD CONSTRAINT "FK_ff102ecfd2f4b5a7edf239dd025" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_ff102ecfd2f4b5a7edf239dd025"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_25ee41d829b06c6e7451b89037f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_bb11bba4ef2fa7eeadb18d36d98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_d553986c71a014b84887615155b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_e59b75368eccc762b3e1fc6c450"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_65fc53070de1fe3dc75014320d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP CONSTRAINT "FK_4770cb51205d54a36cd7ec880c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marriage" DROP CONSTRAINT "FK_06c1c1483dd79c23ac667553be7"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TYPE "public"."payment_currency_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_paymentstatus_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TYPE "public"."profile_position_enum"`);
    await queryRunner.query(`DROP TYPE "public"."profile_gender_enum"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TYPE "public"."course_coursestatus_enum"`);
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
    await queryRunner.query(`DROP TABLE "marriage"`);
    await queryRunner.query(
      `DROP TYPE "public"."marriage_second_parish_cluster_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_second_student_gender_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_first_parish_cluster_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."marriage_first_student_gender_enum"`,
    );
    await queryRunner.query(`DROP TABLE "parish_cluster"`);
    await queryRunner.query(`DROP TABLE "share_base_entity"`);
  }
}
