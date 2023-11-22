import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnetonOneIntableBaptism1700639035728 implements MigrationInterface {
    name = 'AddOnetonOneIntableBaptism1700639035728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parishioner" ADD "baptismId" integer`);
        await queryRunner.query(`ALTER TABLE "parishioner" ADD CONSTRAINT "UQ_53c91e29db5b3f321ccdda1336b" UNIQUE ("baptismId")`);
        await queryRunner.query(`ALTER TABLE "baptism" ADD CONSTRAINT "UQ_5fcf752e4078f189e1a8c9e17be" UNIQUE ("parishionerId")`);
        await queryRunner.query(`ALTER TABLE "baptism" ADD CONSTRAINT "FK_5fcf752e4078f189e1a8c9e17be" FOREIGN KEY ("parishionerId") REFERENCES "parishioner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parishioner" ADD CONSTRAINT "FK_53c91e29db5b3f321ccdda1336b" FOREIGN KEY ("baptismId") REFERENCES "baptism"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parishioner" DROP CONSTRAINT "FK_53c91e29db5b3f321ccdda1336b"`);
        await queryRunner.query(`ALTER TABLE "baptism" DROP CONSTRAINT "FK_5fcf752e4078f189e1a8c9e17be"`);
        await queryRunner.query(`ALTER TABLE "baptism" DROP CONSTRAINT "UQ_5fcf752e4078f189e1a8c9e17be"`);
        await queryRunner.query(`ALTER TABLE "parishioner" DROP CONSTRAINT "UQ_53c91e29db5b3f321ccdda1336b"`);
        await queryRunner.query(`ALTER TABLE "parishioner" DROP COLUMN "baptismId"`);
    }

}
