"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const Configuration_1 = __importDefault(require("../config/Configuration"));
const BaseResponseModel_1 = require("../model/BaseResponseModel");
const verify = function (req, response, jwtCallback) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new jsonwebtoken_1.JsonWebTokenError("invalid token");
        }
        let verifiedResult = jsonwebtoken_1.default.verify(token, Configuration_1.default.server.secretKey);
        req.statusCode = 200;
        jwtCallback(true, verifiedResult);
    }
    catch (e) {
        req.statusCode = 401;
        response.json(new BaseResponseModel_1.BaseResponseModel("authentication failed", 0, null));
        jwtCallback(false, undefined);
    }
};
exports.verify = verify;
