import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldCustomerIdOfPayment1699625978165 implements MigrationInterface {
    name = 'UpdateFieldCustomerIdOfPayment1699625978165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "customerId" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "customerId"`);
    }

}
