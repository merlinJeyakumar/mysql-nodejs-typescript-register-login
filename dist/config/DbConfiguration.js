"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = __importDefault(require("./Configuration"));
const params = {
    user: Configuration_1.default.mysql.user,
    password: Configuration_1.default.mysql.pass,
    host: Configuration_1.default.mysql.host,
    database: Configuration_1.default.mysql.database
};
exports.default = params;
