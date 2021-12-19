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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtJob_1 = require("../job/JwtJob");
const UserModel_1 = require("../domain/model/UserModel");
class AccountController {
    login(req, response) {
        let userName = req.query.userName;
        let password = req.query.password;
        console.log("> login request");
        if (userName == null) {
            return { text: "invalid userName" };
        }
        if (password == null) {
            return { text: "invalid login password" };
        }
        response.status(200);
        (0, DatabaseJob_1.Connect)().then((connection) => {
            new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${password}"`;
                let resultModel = yield (0, DatabaseJob_1.Query)(connection, query);
                if (resultModel.result.length == 1) {
                    resolve(new UserModel_1.UserModel(resultModel.result[0]));
                }
                else if (resultModel.result.length > 1) {
                    reject("invalid access");
                }
                else {
                    reject("invalid credential");
                }
            })).then((userModel) => {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jsonwebtoken_1.default.verify(token, 'SECRETKEY');
                response.json(new BaseResponseModel_1.BaseResponseModel("success", 1, userModel.getJson()));
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel_1.BaseResponseModel(reason, 0, null).getJson());
            }).finally(() => {
                connection.end();
            });
        });
    }
    register(req, response) {
        let userName = req.query.userName;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let password = req.query.password;
        if (userName == null) {
            return { text: "User name required" };
        }
        if (firstName == null || firstName.length < 3) {
            return { text: "please enter valid first name" };
        }
        if (password == null || firstName.length < 5) {
            return { text: "password should be valid, minimum 5 characters" };
        }
        response.status(200);
        (0, DatabaseJob_1.Connect)().then((connection) => {
            new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let existenceQuery = `SELECT EXISTS(SELECT * FROM Users WHERE userName="${userName}" LIMIT 1) AS value;`;
                let insertQuery = "INSERT INTO Users (firstName, lastName, password, userName)" +
                    `VALUES ('${firstName}','${lastName}','${password}','${userName}')` +
                    "ON DUPLICATE KEY " +
                    `UPDATE firstName='${firstName}', lastName='${lastName}', password='${password}'`;
                const userQuery = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${password}"`;
                let promiseExistence = yield (0, DatabaseJob_1.Query)(connection, existenceQuery);
                if (promiseExistence.result[0].value == 1) {
                    reject("account already exist");
                    return;
                }
                yield (0, DatabaseJob_1.Query)(connection, insertQuery);
                resolve(yield (0, DatabaseJob_1.Query)(connection, userQuery).then((res) => {
                    let res_ = res;
                    return new UserModel_1.UserModel(res_.result[0]);
                }));
            })).then((userModel) => {
                let token = (0, JwtJob_1.sign)(userModel);
                let baseResponseModel = new BaseResponseModel_1.BaseResponseModel("success", 1, userModel.getJson());
                response.json(baseResponseModel.getJson());
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel_1.BaseResponseModel(reason, 0, null).getJson());
            }).finally(() => {
                connection.end();
            });
        });
    }
    logout(req, response) {
    }
}
module.exports = new AccountController();
