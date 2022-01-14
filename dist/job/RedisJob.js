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
exports.clearRedisKey = exports.putRedisRefreshToken = exports.putRedisAccessToken = exports.getRedisAccessToken = exports.getRedisRefreshToken = void 0;
const redis = __importStar(require("redis"));
const Configuration_1 = __importDefault(require("../config/Configuration"));
const redisClient = redis.createClient({
    password: Configuration_1.default.redis.pass
});
redisClient.connect().catch(reason => {
    console.log(`RedisError: ${reason}`);
});
const getRedisRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient.HGET(userId, "refresh").catch(reason => {
        console.log(`RedisError: ${reason}`);
        return undefined;
    });
});
exports.getRedisRefreshToken = getRedisRefreshToken;
const getRedisAccessToken = (userId) => {
    return redisClient.HGET(userId, "access").catch(reason => {
        console.log(`RedisError: ${reason}`);
        return undefined;
    });
};
exports.getRedisAccessToken = getRedisAccessToken;
const putRedisAccessToken = (userId, value) => {
    return redisClient.HSET(userId, "access", value).catch(reason => {
        console.log(`RedisError: ${reason}`);
        return undefined;
    });
};
exports.putRedisAccessToken = putRedisAccessToken;
const putRedisRefreshToken = (userId, value) => {
    return redisClient.HSET(userId, "refresh", value).catch(reason => {
        console.log(`RedisError: ${reason}`);
        return undefined;
    });
};
exports.putRedisRefreshToken = putRedisRefreshToken;
const clearRedisKey = function (key) {
    return redisClient.del(key);
};
exports.clearRedisKey = clearRedisKey;
