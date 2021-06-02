import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupInicialDB1622660718800 implements MigrationInterface {
  name = 'SetupInicialDB1622660718800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "walletBalance" character varying NOT NULL, "allow_access" boolean NOT NULL, "avaliated" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "financial_movement_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movement_category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_72df3b67bfc0589d28eff9c4d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "financial_movement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movement_category" uuid NOT NULL, "description" character varying NOT NULL, "user_id" uuid NOT NULL, "value" character varying NOT NULL, "isMoneyIn" boolean NOT NULL, "movement_date" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b05b56da58e9031b6f5621fcf38" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "financial_movement"`);
    await queryRunner.query(`DROP TABLE "financial_movement_category"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
