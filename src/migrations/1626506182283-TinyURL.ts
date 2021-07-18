import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TinyURL1626506182283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tiny_urls',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'tiny_url', type: 'varchar', isUnique: true },
          { name: 'main_url', type: 'varchar', isNullable: true },
          { name: 'clicks', type: 'int', default: 0 },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tiny_urls');
  }
}
