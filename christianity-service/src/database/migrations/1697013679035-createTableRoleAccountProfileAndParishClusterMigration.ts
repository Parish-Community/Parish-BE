import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRoleAccountProfileAndParishClusterMigration1697013679035
  implements MigrationInterface
{
  name = 'CreateTableRoleAccountProfileAndParishClusterMigration1697013679035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parish_cluster" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(500) NOT NULL, "parish_clusterId" integer NOT NULL, CONSTRAINT "UQ_50578f9f94822acd59bab38140b" UNIQUE ("parish_clusterId"), CONSTRAINT "PK_3c31bfc9d2932c3a2bf02e70462" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "fullname" character varying(500) NOT NULL, "christianName" character varying(100) NOT NULL, "gender" "public"."profile_gender_enum" NOT NULL, "dateOfBirth" date, "phonenumber" character varying(10), "address" character varying(500) NOT NULL, "diocese" character varying(500) NOT NULL, "parish" character varying(500) NOT NULL, "isRequestAccount" boolean NOT NULL DEFAULT false, "parish_clusterId" integer NOT NULL, CONSTRAINT "UQ_0f6860fa849deb3bcf2baaf2fde" UNIQUE ("phonenumber"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" "public"."role_name_enum" NOT NULL DEFAULT 'user', "roleId" integer NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "UQ_703705ba862c2bb45250962c9e1" UNIQUE ("roleId"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "phonenumber" character varying(10) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, "isValidOtp" boolean NOT NULL DEFAULT false, "firstLogin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "profileId" integer, "roleId" integer NOT NULL, CONSTRAINT "UQ_cf18095b79d00bb4b9062a4a1fb" UNIQUE ("phonenumber"), CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_bb11bba4ef2fa7eeadb18d36d98" FOREIGN KEY ("parish_clusterId") REFERENCES "parish_cluster"("parish_clusterId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_ff102ecfd2f4b5a7edf239dd025" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_ff102ecfd2f4b5a7edf239dd025"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_bb11bba4ef2fa7eeadb18d36d98"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TYPE "public"."profile_gender_enum"`);
    await queryRunner.query(`DROP TABLE "parish_cluster"`);
  }
}
