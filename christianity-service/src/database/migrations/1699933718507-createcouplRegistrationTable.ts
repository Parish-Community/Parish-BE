import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatecouplRegistrationTable1699933718507
  implements MigrationInterface
{
  name = 'CreatecouplRegistrationTable1699933718507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."couple_registration_partner2_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "couple_registration" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "partner1Id" integer NOT NULL, "partner2Id" integer NOT NULL, "partner2_christianName" character varying(500) NOT NULL, "partner2_fullname" character varying(500) NOT NULL, "partner2_gender" "public"."couple_registration_partner2_gender_enum" NOT NULL, "partner2_dateOfBirth" date NOT NULL, "partner2_name_father" character varying(500) NOT NULL, "partner2_name_mother" character varying(500) NOT NULL, "partner2_phonenumber" character varying(10), "partner2_avatar" character varying(500), "partner2_email" character varying(500) NOT NULL, "partner2_address" character varying(500) NOT NULL, "partner2_parish_clusterId" integer NOT NULL, CONSTRAINT "UQ_b583c0b9af05b56724def2b3601" UNIQUE ("partner2_phonenumber"), CONSTRAINT "UQ_b1f78bb547814e5a07025550b8d" UNIQUE ("partner2_email"), CONSTRAINT "PK_72ceacff31f0338516e3701a09c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD CONSTRAINT "FK_1882814ae516dc7be326137a944" FOREIGN KEY ("partner1Id") REFERENCES "parishioner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" ADD CONSTRAINT "FK_5dfd4419d51a3d689403f73d21f" FOREIGN KEY ("partner2Id") REFERENCES "parishioner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP CONSTRAINT "FK_5dfd4419d51a3d689403f73d21f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "couple_registration" DROP CONSTRAINT "FK_1882814ae516dc7be326137a944"`,
    );
    await queryRunner.query(`DROP TABLE "couple_registration"`);
    await queryRunner.query(
      `DROP TYPE "public"."couple_registration_partner2_gender_enum"`,
    );
  }
}
