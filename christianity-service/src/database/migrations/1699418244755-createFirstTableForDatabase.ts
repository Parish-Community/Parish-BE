import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFirstTableForDatabase1699418244755
  implements MigrationInterface
{
  name = 'CreateFirstTableForDatabase1699418244755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "share_base_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f17ce4c5e503f65d0cc177856ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" "public"."role_name_enum" NOT NULL DEFAULT 'user', "roleId" integer NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "UQ_703705ba862c2bb45250962c9e1" UNIQUE ("roleId"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_paymentstatus_enum" AS ENUM('pending', 'cancelled', 'paid')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_currency_enum" AS ENUM('usd')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "stripeSessionId" character varying NOT NULL, "description" character varying(500), "paymentStatus" "public"."payment_paymentstatus_enum" NOT NULL DEFAULT 'pending', "initiatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "finalisedAt" TIMESTAMP DEFAULT now(), "currency" "public"."payment_currency_enum" NOT NULL, "accountId" integer, CONSTRAINT "UQ_4f1a3ee2c5a576a7588bd4cf7ed" UNIQUE ("stripeSessionId"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "phonenumber" character varying(10) NOT NULL, "christianName" character varying(500) NOT NULL, "fullname" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, "isValidOtp" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "parishionerId" integer NOT NULL, "roleId" integer NOT NULL, "refresh_token" character varying(500), "isRegisterMarriage" boolean NOT NULL DEFAULT false, "address" character varying(500), "email" character varying(500), CONSTRAINT "UQ_cf18095b79d00bb4b9062a4a1fb" UNIQUE ("phonenumber"), CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."parishioner_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."parishioner_position_enum" AS ENUM('priest', 'monk', 'nun', 'christianity')`,
    );
    await queryRunner.query(
      `CREATE TABLE "parishioner" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "fullname" character varying(500) NOT NULL, "christianName" character varying(100) NOT NULL, "gender" "public"."parishioner_gender_enum" NOT NULL, "dateOfBirth" date NOT NULL, "name_father" character varying(500) NOT NULL, "name_mother" character varying(500) NOT NULL, "phonenumber" character varying(10), "avatar" character varying(500), "address" character varying(500) NOT NULL, "diocese" character varying(500) NOT NULL, "parish" character varying(500) NOT NULL, "parish_clusterId" integer NOT NULL, "position" "public"."parishioner_position_enum", "isReqAccount" boolean NOT NULL DEFAULT false, "isMarried" boolean NOT NULL DEFAULT false, "isReqMarriageCatechism" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_932dc72cd6c5fee2034c2fd551b" UNIQUE ("phonenumber"), CONSTRAINT "PK_5d32f7e2e8fb72bce8b132bb393" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "parish_cluster" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(500) NOT NULL, "parish_clusterId" integer NOT NULL, CONSTRAINT "UQ_50578f9f94822acd59bab38140b" UNIQUE ("parish_clusterId"), CONSTRAINT "PK_3c31bfc9d2932c3a2bf02e70462" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."course_coursestatus_enum" AS ENUM('open', 'close')`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "courseName" character varying(500) NOT NULL, "startDate" date NOT NULL, "endDate" date, "courseStatus" "public"."course_coursestatus_enum" NOT NULL DEFAULT 'open', "createdBy" integer NOT NULL, "totalMember" integer NOT NULL DEFAULT '15', CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_25ee41d829b06c6e7451b89037f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_4392c027371692eef2f2e4231be" FOREIGN KEY ("parishionerId") REFERENCES "parishioner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parishioner" ADD CONSTRAINT "FK_1631737581a5e2ada5786a58246" FOREIGN KEY ("parish_clusterId") REFERENCES "parish_cluster"("parish_clusterId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parishioner" DROP CONSTRAINT "FK_1631737581a5e2ada5786a58246"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_4392c027371692eef2f2e4231be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_25ee41d829b06c6e7451b89037f"`,
    );
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TYPE "public"."course_coursestatus_enum"`);
    await queryRunner.query(`DROP TABLE "parish_cluster"`);
    await queryRunner.query(`DROP TABLE "parishioner"`);
    await queryRunner.query(`DROP TYPE "public"."parishioner_position_enum"`);
    await queryRunner.query(`DROP TYPE "public"."parishioner_gender_enum"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TYPE "public"."payment_currency_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_paymentstatus_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(`DROP TABLE "share_base_entity"`);
  }
}
