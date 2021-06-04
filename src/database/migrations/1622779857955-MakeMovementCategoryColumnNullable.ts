import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeMovementCategoryColumnNullable1622779857955
  implements MigrationInterface {
  name = 'MakeMovementCategoryColumnNullable1622779857955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financial_movement" DROP CONSTRAINT "FK_4d84a63d0a61df26650e1b2d310"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" DROP CONSTRAINT "FK_7459ba156e8519eeb49c18e3ccb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" ALTER COLUMN "movement_category" DROP NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "financial_movement"."movement_category" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" ADD CONSTRAINT "FK_4d84a63d0a61df26650e1b2d310" FOREIGN KEY ("movement_category") REFERENCES "financial_movement_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" ADD CONSTRAINT "FK_7459ba156e8519eeb49c18e3ccb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financial_movement" DROP CONSTRAINT "FK_7459ba156e8519eeb49c18e3ccb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" DROP CONSTRAINT "FK_4d84a63d0a61df26650e1b2d310"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "financial_movement"."movement_category" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" ALTER COLUMN "movement_category" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" ADD CONSTRAINT "FK_7459ba156e8519eeb49c18e3ccb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_movement" ADD CONSTRAINT "FK_4d84a63d0a61df26650e1b2d310" FOREIGN KEY ("movement_category") REFERENCES "financial_movement_category"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
