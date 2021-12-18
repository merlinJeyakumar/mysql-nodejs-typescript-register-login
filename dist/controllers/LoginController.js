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
const BaseResponseModel_1 = require("../model/BaseResponseModel");
const UserModel_1 = require("../model/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
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
                response.json(new BaseResponseModel_1.BaseResponseModel("success", 1, 200, userModel.getJson()));
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel_1.BaseResponseModel(reason, 0, 200, null).getJson());
            }).finally(() => {
                connection.end();
            });
        });
    }
}
module.exports = new LoginController();
