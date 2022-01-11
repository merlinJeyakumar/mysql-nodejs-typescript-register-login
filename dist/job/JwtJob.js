"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.getRefreshToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Configuration_1 = __importDefault(require("../config/Configuration"));
const verifyToken = function (token) {
    try {
        if (!token) {
            throw new Error("invalid token");
        }
        let verifiedResult = jsonwebtoken_1.default.verify(token, Configuration_1.default.server.secretKey);
        //req.statusCode = 200
        return verifiedResult;
    }
    catch (e) {
        //req.statusCode = 401
        throw new Error("authentication failed");
    }
};
exports.verifyToken = verifyToken;
const getRefreshToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, Configuration_1.default.server.secretKey, {
        expiresIn: '30d'
    });
};
exports.getRefreshToken = getRefreshToken;
const getAccessToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, Configuration_1.default.server.secretKey, {
        expiresIn: '1d'
    });
};
exports.getAccessToken = getAccessToken;
