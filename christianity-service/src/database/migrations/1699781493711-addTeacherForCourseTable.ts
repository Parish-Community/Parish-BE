import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeacherForCourseTable1699781493711 implements MigrationInterface {
    name = 'AddTeacherForCourseTable1699781493711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "teacherId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b" FOREIGN KEY ("teacherId") REFERENCES "parishioner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "teacherId"`);
    }

}
