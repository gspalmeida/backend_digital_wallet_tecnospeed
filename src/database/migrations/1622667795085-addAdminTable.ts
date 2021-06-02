import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdminTable1622667795085 implements MigrationInterface {
  name = 'addAdminTable1622667795085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admins"`);
  }
}
