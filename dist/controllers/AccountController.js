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
const DatabaseJob_1 = require("../job/DatabaseJob");
const BaseResponseModel_1 = require("../domain/model/BaseResponseModel");
const UserModel_1 = require("../domain/model/UserModel");
const AuthenticationModel_1 = require("../domain/model/AuthenticationModel");
const uuid = require("uuid");
const AuthenticationUtility_1 = require("./utility/AuthenticationUtility");
const Utility_1 = require("../support/utility/Utility");
const EncryptionUtility_1 = require("../support/EncryptionUtility");
class AccountController {
    login(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
            let userName = req.query.userName;
            let password = req.query.password;
            response.status(200);
            if (!userName || userName.length < 6 || !password || password.length < 8) {
                return response.json(baseResponseBuilder.asFailure("invalid username/password").build().getJson());
            }
            (0, DatabaseJob_1.Connect)().then((connection) => {
                new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    let execResult = yield (0, DatabaseJob_1.Query)(connection, `SELECT * FROM Users WHERE userName = '${userName}'`).catch(reason => {
                        reject(reason);
                    });
                    const userModel = new UserModel_1.UserModel().setSqlResult(execResult);
                    if (userModel && (yield (0, EncryptionUtility_1.compareHashPassword)(password, userModel.password))) {
                        resolve(userModel);
                    }
                    else {
                        reject("invalid credentials");
                    }
                })).then((userModel) => __awaiter(this, void 0, void 0, function* () {
                    let token = yield (0, AuthenticationUtility_1.cacheSession)(userModel.uid);
                    baseResponseBuilder.setAuth(new AuthenticationModel_1.AuthenticationModel(token.accessToken, token.refreshToken).getJson());
                    baseResponseBuilder.setResult(userModel.getJson());
                    baseResponseBuilder.asSuccess();
                })).catch(reason => {
                    console.log(reason);
                    baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(reason));
                }).finally(() => {
                    connection.end();
                    response.json(baseResponseBuilder.build().getJson());
                });
            });
        });
    }
    register(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
            let userName = req.query.userName;
            let firstName = req.query.firstName;
            let lastName = req.query.lastName;
            let password = req.query.password;
            if (!userName || userName.length < 6) {
                return response.json(baseResponseBuilder.asFailure("valid username required, more than six characters required").build().getJson());
            }
            if (!firstName || firstName.length < 3) {
                return response.json(baseResponseBuilder.asFailure("valid first name required, more than three characters").build().getJson());
            }
            if (!password || password.length < 8) {
                return response.json(baseResponseBuilder.asFailure("valid password required, could be more than eight characters").build().getJson());
            }
            response.status(200);
            (0, DatabaseJob_1.Connect)().then((connection) => {
                let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
                new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const uid = uuid.v4();
                    let insertQuery = "INSERT INTO Users (first_name, last_name, password, userName, uid)" +
                        `VALUES ('${firstName}','${lastName}','${yield (0, EncryptionUtility_1.getPasswordHash)(password)}','${userName}','${uid}');`;
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
                        resolve(new UserModel_1.UserModel().set(uid, userName, firstName, lastName, undefined, password));
                    }
                })).then((userModel) => __awaiter(this, void 0, void 0, function* () {
                    let token = yield (0, AuthenticationUtility_1.cacheSession)(userModel.uid);
                    baseResponseBuilder.setAuth(token);
                    baseResponseBuilder.setResult(userModel);
                })).catch(reason => {
                    console.log(reason);
                    req.statusCode = 400;
                    baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(reason));
                }).finally(() => {
                    connection.end();
                    response.json(baseResponseBuilder.build().getJson());
                });
            });
        });
    }
    profileUpdate(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseResponseBuilder = new BaseResponseModel_1.BaseResponseModel();
            let uid = req.query.uid;
            if (!uid) {
                return response.json(baseResponseBuilder.asFailure("uid required").getJson());
            }
            try {
                yield (0, AuthenticationUtility_1.verifyAuthorization)((0, AuthenticationUtility_1.getTokenInRequest)(req), uid); //authentication
                req.statusCode = 200;
            }
            catch (e) {
                req.statusCode = 401;
                return response.json(baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(e), 401).getJson());
            }
            let firstName = req.query.firstName;
            let lastName = req.query.lastName;
            let mobileNumber = req.query.mobileNumber;
            let password = req.query.password;
            let userName = req.query.userName;
            let updateMap = new Map();
            if (firstName && (firstName.length < 6 || firstName.length > 16)) {
                return response.json(baseResponseBuilder.asFailure("invalid first name, it length could be more than six to 16").getJson());
            }
            else if (firstName) {
                updateMap.set("firstName", firstName);
            }
            if (lastName && (lastName.length == 0 || lastName.length > 16)) {
                return response.json(baseResponseBuilder.asFailure("invalid last name, it length could be more than ").getJson());
            }
            else if (lastName) {
                updateMap.set("lastName", lastName);
            }
            if (mobileNumber && (mobileNumber.length < 6 || mobileNumber.length > 13)) {
                return response.json(baseResponseBuilder.asFailure("invalid mobile number").getJson());
            }
            else if (mobileNumber) {
                updateMap.set("mobileNumber", mobileNumber);
            }
            if (password && (password.length < 6 || mobileNumber.length > 22)) {
                return response.json(baseResponseBuilder.asFailure("invalid password, it length could be more than six to 22").getJson());
            }
            else if (password) {
                updateMap.set("password", password);
            }
            if (userName && (userName.length < 6 || userName.length > 16)) {
                return response.json(baseResponseBuilder.asFailure("invalid password, it length could be more than six to 16").getJson());
            }
            else if (userName) {
                updateMap.set("userName", userName);
            }
            if (updateMap.size == 0) {
                return response.json(baseResponseBuilder.asFailure("invalid usage").getJson());
            }
            (0, DatabaseJob_1.Connect)().then(connection => {
                let query = "";
                let index = 0;
                updateMap.forEach((value, key) => {
                    query += `\`${key}\` = '${value}'`;
                    if (index < updateMap.size - 1) {
                        query += `,`;
                    }
                    index++;
                });
                query = `UPDATE Users SET ${query} WHERE (\`uid\` = '${uid}');`;
                (0, DatabaseJob_1.Query)(connection, query).then((value) => __awaiter(this, void 0, void 0, function* () {
                    let token = yield (0, AuthenticationUtility_1.cacheSession)(uid);
                    baseResponseBuilder.setAuth(new AuthenticationModel_1.AuthenticationModel(token.accessToken, token.refreshToken).getJson());
                })).catch(reason => {
                    baseResponseBuilder.asFailure(reason);
                }).finally(() => {
                    connection.end();
                    response.json(baseResponseBuilder.getJson());
                });
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
                yield (0, AuthenticationUtility_1.clearSession)(uid);
                req.statusCode = 200;
                response.json(baseResponseBuilder.asSuccess().getJson());
            }
            catch (e) {
                req.statusCode = 401;
                response.json(baseResponseBuilder.asFailure((0, Utility_1.getErrorMessage)(e), 401).getJson());
            }
        });
    }
    refreshToken(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
module.exports = new AccountController();
