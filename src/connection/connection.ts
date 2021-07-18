import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  url: String(process.env.DATABASE_URL),
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: ['dist/entities/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
  ssl: { rejectUnauthorized: false },
  logging: true,
};

export default config;
