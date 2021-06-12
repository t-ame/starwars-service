import mysql from 'mysql';
import { Logger } from '../helpers';

export const autoCreateDb = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.DB_SERVER || 'starwarsdb.cowbr3k8zikh.us-east-2.rds.amazonaws.com',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
    });

    connection.connect();

    Logger.Info('Attempting to auto-create db');

    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'starwars_db'} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`, err => {
      connection.end();

      if (err) {
        Logger.Info('Unable to create database.', err.message, err.stack);
        reject(err);
      }

      resolve();
    });
  });
};
