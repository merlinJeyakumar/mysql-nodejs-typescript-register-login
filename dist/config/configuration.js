"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '.env'
});
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const SERVER_HOSTNAME = process.env.SERVER_NAME;
const SERVER_PORT = process.env.PORT;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    secretKey: SECRET_ACCESS_KEY
};
const config = {
    mysql: MYSQL,
    server: SERVER
};
exports.default = config;
