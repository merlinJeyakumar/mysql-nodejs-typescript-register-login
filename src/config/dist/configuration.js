"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({
    path: '.env'
});
var MYSQL_HOST = process.env.MYSQL_HOST;
var MYSQL_DATABASE = process.env.MYSQL_DATABASE;
var MYSQL_USER = process.env.MYSQL_USER;
var MYSQL_PASS = process.env.MYSQL_PASS;
var SERVER_HOSTNAME = process.env.SERVER_NAME;
var SERVER_PORT = process.env.PORT;
var MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    mysql: MYSQL,
    server: SERVER
};
exports["default"] = config;
