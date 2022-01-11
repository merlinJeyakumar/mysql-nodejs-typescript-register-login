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
const DatabaseJob_1 = require("../job/DatabaseJob");
const BaseResponseModel_1 = require("../domain/model/BaseResponseModel");
const UserModel_1 = require("../domain/model/UserModel");
const AuthenticationModel_1 = require("../domain/model/AuthenticationModel");
const uuid = require("uuid");
const AuthenticationUtility_1 = require("./utility/AuthenticationUtility");
const Utility_1 = require("../support/utility/Utility");
const EncryptionUtility_1 = require("../support/EncryptionUtility");
const Configuration_1 = __importDefault(require("../config/Configuration"));
class AccountController {
    login(req, response) {
        let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
        let userName = req.query.userName;
        let password = req.query.password;
        response.status(200);
        if (!userName || userName.length < 6 || !password || password.length < 8) {
            return response.json(baseResponseBuilder.asFailure("invalid username/password").build().getJson());
        }
        (0, DatabaseJob_1.Connect)().then((connection) => {
            new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${(0, EncryptionUtility_1.encryptStringAes)(password, Configuration_1.default.server.secretKey)}"`;
                console.log("JeyK: query ", query, +"password: " + password);
                let execResult = yield (0, DatabaseJob_1.Query)(connection, query);
                if (execResult.rows.length == 1) {
                    resolve(new UserModel_1.UserModel().setSqlResult(execResult));
                }
                else if (execResult.rows.length > 1) {
                    reject("invalid access");
                }
                else {
                    reject("invalid credential");
                }
            })).then((userModel) => __awaiter(this, void 0, void 0, function* () {
                let token = yield (0, AuthenticationUtility_1.cacheSession)(userModel.uid);
                baseResponseBuilder.setResult(new AuthenticationModel_1.AuthenticationModel(token.accessToken, token.refreshToken).getJson());
                baseResponseBuilder.asSuccess();
            })).catch(reason => {
                console.log(reason);
                baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(reason));
            }).finally(() => {
                connection.end();
                response.json(baseResponseBuilder.build().getJson());
            });
        });
    }
    register(req, response) {
        let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
        let userName = req.query.userName;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let password = req.query.password;
        if (!userName || userName.length < 6) {
            return response.json(baseResponseBuilder.asFailure("valid username required, more than six characters required").build().getJson());
        }
        if (!firstName || firstName.length < 3) {
            return response.json(baseResponseBuilder.asFailure("first name required, more than three characters").build().getJson());
        }
        if (!password || password.length < 8) {
            return response.json(baseResponseBuilder.asFailure("password could be more than eight characters required").build().getJson());
        }
        response.status(200);
        (0, DatabaseJob_1.Connect)().then((connection) => {
            let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
            new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const uid = uuid.v4();
                let insertQuery = "INSERT INTO Users (firstName, lastName, password, userName, uid)" +
                    `VALUES ('${firstName}','${lastName}','${(0, EncryptionUtility_1.encryptStringAes)(password, Configuration_1.default.server.secretKey)}','${userName}','${uid}');`;
                let execResult = yield (0, DatabaseJob_1.Query)(connection, insertQuery).catch(reason => {
                    console.log((0, Utility_1.getErrorMessage)(reason));
                    switch (reason.code) {
                        case "ER_DUP_ENTRY":
                            reject("user already exist");
                            break;
                        default:
                            reject("unexpected issue x001");
                            break;
                    }
                });
                if (execResult) {
                    resolve(new UserModel_1.UserModel().set(uid, userName, firstName, lastName, undefined));
                }
            })).then((userModel) => __awaiter(this, void 0, void 0, function* () {
                let token = yield (0, AuthenticationUtility_1.cacheSession)(userModel.uid);
                baseResponseBuilder.setResult(new AuthenticationModel_1.AuthenticationModel(token.accessToken, token.refreshToken).getJson());
            })).catch(reason => {
                console.log(reason);
                req.statusCode = 400;
                baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(reason));
            }).finally(() => {
                connection.end();
                response.json(baseResponseBuilder.build().getJson());
            });
        });
    }
    /**
     * uid:int
     * token:Authorization-string
     */
    logout(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
            let uid = req.query.uid;
            if (!uid) {
                return response.json(baseResponseBuilder.asFailure("uid required").build().getJson());
            }
            try {
                yield (0, AuthenticationUtility_1.verifyAuthorization)((0, AuthenticationUtility_1.getTokenInRequest)(req), uid);
                req.statusCode = 200;
            }
            catch (e) {
                req.statusCode = 401;
                response.json(baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(e), 401).getJson());
            }
        });
    }
}
module.exports = new AccountController();
