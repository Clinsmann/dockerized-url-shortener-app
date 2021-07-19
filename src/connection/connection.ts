import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const addSSl =
  process.env.NDOE_ENV === 'production'
    ? { ssl: { rejectUnauthorized: false } }
    : '';

const config: ConnectionOptions = {
  type: 'postgres',
  url: String(process.env.DATABASE_URL),
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: [
    'dist/entities/*{.ts,.js}',
    process.env.NODE_ENV === 'test' ? 'src/entities/*{.ts,.js}' : '',
  ],
  cli: { migrationsDir: 'src/migrations' },
  logging: process.env.NDOE_ENV === 'development',
  // ssl: { rejectUnauthorized: false },
  // dropSchema: process.env.NODE_ENV === 'test',
  synchronize: process.env.NODE_ENV === 'test',
  ...addSSl,
};

export default config;
