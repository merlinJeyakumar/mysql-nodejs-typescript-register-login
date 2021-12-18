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
const BaseResponseModel_1 = require("../model/BaseResponseModel");
const UserModel_1 = require("../model/UserModel");
class RegisterController {
    signup(req, response) {
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
            let promiseUserExistenceQuery = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                // const token = jwt.sign({
                //         username: "userName",
                //         userId: "my_id"
                //     },
                //     'SECRETKEY', {
                //         expiresIn: '1m'
                //     }
                // );
                let baseResponseModel = new BaseResponseModel_1.BaseResponseModel("success", 1, 200, userModel.getJson());
                response.json(baseResponseModel.getJson());
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel_1.BaseResponseModel(reason, 0, 200, null).getJson());
            }).finally(() => {
                connection.end();
            });
        });
    }
}
module.exports = new RegisterController();
