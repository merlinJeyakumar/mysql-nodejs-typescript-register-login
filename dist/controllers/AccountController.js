"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseResponseModel_1 = require("../model/BaseResponseModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Configuration_1 = __importDefault(require("../config/Configuration"));
class AccountController {
    withdraw(req, response) {
        const token = req.headers.a.split(' ')[1];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, Configuration_1.default.server.secretKey);
        }
        catch (e) {
            req.statusCode = 401;
            req.statusMessage = "unauthorized";
            return response.json(new BaseResponseModel_1.BaseResponseModel("unauthorized", 0, 401, null));
        }
    }
}
module.exports = new AccountController();
