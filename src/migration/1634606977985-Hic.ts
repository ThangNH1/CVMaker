import {MigrationInterface, QueryRunner} from "typeorm";

export class Hic1634606977985 implements MigrationInterface {
    name = 'Hic1634606977985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cvmaker\`.\`invites\` (\`id\` int NOT NULL AUTO_INCREMENT, \`inviteCode\` varchar(255) NULL, \`inviteBy\` varchar(255) NULL, \`inviteCount\` int NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_9b5f711bc3b50a595a0b8a6eeb\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cvmaker\`.\`answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`answer\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`resumeId\` int NULL, \`questionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cvmaker\`.\`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fieldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cvmaker\`.\`fields\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cvmaker\`.\`resumes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, \`fieldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cvmaker\`.\`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NULL, \`password\` varchar(255) NULL, \`fullname\` varchar(255) NULL, \`email\` varchar(255) NULL, \`avatar_url\` varchar(255) NOT NULL DEFAULT '', \`role\` varchar(255) NOT NULL DEFAULT 'user', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`inviteId\` int NULL, UNIQUE INDEX \`REL_56cefb30099594c54c503cf3c4\` (\`inviteId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`invites\` ADD CONSTRAINT \`FK_9b5f711bc3b50a595a0b8a6eeb4\` FOREIGN KEY (\`accountId\`) REFERENCES \`cvmaker\`.\`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`answers\` ADD CONSTRAINT \`FK_bcbb2de851d7f3f4057f7ce36e0\` FOREIGN KEY (\`resumeId\`) REFERENCES \`cvmaker\`.\`resumes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`answers\` ADD CONSTRAINT \`FK_c38697a57844f52584abdb878d7\` FOREIGN KEY (\`questionId\`) REFERENCES \`cvmaker\`.\`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`questions\` ADD CONSTRAINT \`FK_c8d41764f9f0f9572b84eca5e95\` FOREIGN KEY (\`fieldId\`) REFERENCES \`cvmaker\`.\`fields\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`resumes\` ADD CONSTRAINT \`FK_a5c2c90b50fdcc5ce17b1a2c0ca\` FOREIGN KEY (\`accountId\`) REFERENCES \`cvmaker\`.\`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`resumes\` ADD CONSTRAINT \`FK_86f425a5edbfa7a418177355135\` FOREIGN KEY (\`fieldId\`) REFERENCES \`cvmaker\`.\`fields\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`accounts\` ADD CONSTRAINT \`FK_56cefb30099594c54c503cf3c46\` FOREIGN KEY (\`inviteId\`) REFERENCES \`cvmaker\`.\`invites\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`accounts\` DROP FOREIGN KEY \`FK_56cefb30099594c54c503cf3c46\``);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`resumes\` DROP FOREIGN KEY \`FK_86f425a5edbfa7a418177355135\``);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`resumes\` DROP FOREIGN KEY \`FK_a5c2c90b50fdcc5ce17b1a2c0ca\``);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`questions\` DROP FOREIGN KEY \`FK_c8d41764f9f0f9572b84eca5e95\``);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`answers\` DROP FOREIGN KEY \`FK_c38697a57844f52584abdb878d7\``);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`answers\` DROP FOREIGN KEY \`FK_bcbb2de851d7f3f4057f7ce36e0\``);
        await queryRunner.query(`ALTER TABLE \`cvmaker\`.\`invites\` DROP FOREIGN KEY \`FK_9b5f711bc3b50a595a0b8a6eeb4\``);
        await queryRunner.query(`DROP INDEX \`REL_56cefb30099594c54c503cf3c4\` ON \`cvmaker\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`cvmaker\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`cvmaker\`.\`resumes\``);
        await queryRunner.query(`DROP TABLE \`cvmaker\`.\`fields\``);
        await queryRunner.query(`DROP TABLE \`cvmaker\`.\`questions\``);
        await queryRunner.query(`DROP TABLE \`cvmaker\`.\`answers\``);
        await queryRunner.query(`DROP INDEX \`REL_9b5f711bc3b50a595a0b8a6eeb\` ON \`cvmaker\`.\`invites\``);
        await queryRunner.query(`DROP TABLE \`cvmaker\`.\`invites\``);
    }

}
