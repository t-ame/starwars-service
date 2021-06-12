"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoCreateDb = void 0;
const mysql_1 = __importDefault(require("mysql"));
const helpers_1 = require("../helpers");
exports.autoCreateDb = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql_1.default.createConnection({
            host: process.env.DB_SERVER,
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });
        connection.connect();
        helpers_1.Logger.Info('Attempting to auto-create db');
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`, err => {
            connection.end();
            if (err) {
                helpers_1.Logger.Info('Unable to create database.', err.message, err.stack);
                reject(err);
            }
            resolve();
        });
    });
};
//# sourceMappingURL=mysql.js.map