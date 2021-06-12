"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
require("reflect-metadata");
const models_1 = require("../models");
const isDev = process.env.NODE_ENV === 'development';
const connectionOpts = {
    type: 'mysql',
    host: process.env.DB_SERVER || 'starwarsdb.cowbr3k8zikh.us-east-2.rds.amazonaws.com',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'starwars_db',
    entities: [models_1.Movie, models_1.Character, models_1.Comment],
    synchronize: isDev,
    logging: isDev,
    migrationsRun: true,
    migrations: [],
    cli: {
        migrationsDir: './src/migrations',
    },
    charset: 'utf8mb4_unicode_ci',
};
exports.default = connectionOpts;
//# sourceMappingURL=typeorm.js.map