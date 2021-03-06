/* istanbul ignore file */
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { Movie, Character, Comment } from '../models';

const isDev = process.env.NODE_ENV === 'development';

const connectionOpts: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Movie, Character, Comment],
  synchronize: isDev,
  logging: false,
  migrationsRun: true,
  migrations: [],
  cli: {
    migrationsDir: './src/migrations',
  },
  charset: 'utf8mb4_unicode_ci',
};

export default connectionOpts;
