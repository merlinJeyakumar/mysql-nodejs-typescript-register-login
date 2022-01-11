"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorization = exports.cacheSession = exports.getTokenInRequest = void 0;
const RedisJob_1 = require("../../job/RedisJob");
const JwtJob_1 = require("../../job/JwtJob");
const EncryptionUtility_1 = require("../../support/EncryptionUtility");
const Configuration_1 = __importDefault(require("../../config/Configuration"));
const getTokenInRequest = function (req) {
    if (!req.headers.authorization) {
        throw new Error("invalid token");
    }
    else {
        return req.headers.authorization.split(' ')[1];
    }
};
exports.getTokenInRequest = getTokenInRequest;
const cacheSession = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {
        uid: (0, EncryptionUtility_1.encryptStringAes)(uid, Configuration_1.default.server.secretKey)
    };
    let refreshToken = (0, JwtJob_1.getRefreshToken)(payload);
    let accessToken = (0, JwtJob_1.getAccessToken)(payload);
    yield (0, RedisJob_1.putRedisAccessToken)(uid, accessToken);
    yield (0, RedisJob_1.putRedisRefreshToken)(uid, refreshToken);
    return {
        refreshToken,
        accessToken
    };
});
exports.cacheSession = cacheSession;
const verifyAuthorization = (token, uid) => __awaiter(void 0, void 0, void 0, function* () {
    if (!uid) {
        throw new Error("uid required");
    }
    let refreshToken = yield (0, RedisJob_1.getRedisRefreshToken)(uid); //todo: register not updating redis
    if (!refreshToken) {
        let payload = (0, JwtJob_1.verifyToken)(token);
        console.log(`JeyK: ` + payload.uid == uid);
        console.log(`JeyK: ${payload.uid}`);
        console.log(`JeyK: ${uid}`);
        let payloadUid = payload.uid;
        if (payloadUid) {
            payloadUid = (0, EncryptionUtility_1.decryptStringAes)(payloadUid, Configuration_1.default.server.secretKey);
        }
        if (payloadUid == uid) {
            return true;
        }
        else {
            throw new Error("unauthorized access");
        }
    }
    else {
        throw new Error("invalid authentication method");
    }
});
exports.verifyAuthorization = verifyAuthorization;
