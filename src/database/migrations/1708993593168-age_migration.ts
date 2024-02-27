import { MigrationInterface, QueryRunner } from 'typeorm';

export class AgeMigration1708993593168 implements MigrationInterface {
  name = 'AgeMigration1708993593168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
  }
}
