import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserStatusColumn1622674157549 implements MigrationInterface {
    name = 'UpdateUserStatusColumn1622674157549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "avaliated" TO "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "status" TO "avaliated"`);
    }

}
