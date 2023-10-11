import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedParishClusterData1697013822174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO "parish_cluster"("name", "parish_clusterId") VALUES ($1,$2),($3,$4),($5,$6),($7,$8),($9,$10),($11,$12)',
      [
        'Tân Lộc',
        1,
        'Tràng Thị',
        2,
        'Tràng Lưu',
        3,
        'Giang Lĩnh',
        4,
        'Đồng Lưu',
        5,
        'Đô Khê',
        6,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
