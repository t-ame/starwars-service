/* istanbul ignore file */
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { Movie, Character, Comment } from '../models';

const isDev = process.env.NODE_ENV === 'development';

const connectionOpts: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_SERVER || 'starwarsdb.cowbr3k8zikh.us-east-2.rds.amazonaws.com',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'starwars_db',
  entities: [Movie, Character, Comment],
  synchronize: isDev,
  logging: isDev,
  migrationsRun: true,
  migrations: [],
  cli: {
    migrationsDir: './src/migrations',
  },
  charset: 'utf8mb4_unicode_ci',
};

export default connectionOpts;
