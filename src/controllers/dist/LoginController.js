"use strict";
var DatabaseJob_1 = require("../job/DatabaseJob");
var BaseResponseModel_1 = require("../model/BaseResponseModel");
var UserModel_1 = require("../model/UserModel");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.defaultMethod = function () {
        return { text: "you reached a login" };
    };
    LoginController.prototype.login = function (req) {
        var userName = req.query.userName;
        var password = req.query.password;
        console.log("> login request");
        if (userName == null) {
            return { text: "invalid userName" };
        }
        if (password == null) {
            return { text: "invalid login password" };
        }
        DatabaseJob_1.Connect().then(function (connection) {
            var query = "SELECT * FROM Users WHERE userName = \"" + userName + "\" AND password = \"" + password + "\"";
            DatabaseJob_1.Query(connection, query).then(function (res) {
                var fields = res;
                var result = res;
                var myArray = value;
                if (result.length == 1) {
                    var responseModel = new BaseResponseModel_1.BaseResponseModel("success", 200, new UserModel_1.UserModel(result));
                    return { text: responseModel };
                }
                else if (result.length > 1) {
                    return { text: "invalid access" };
                }
                else {
                    return { text: "invalid credential" };
                }
                console.log("JK", result.mobileNumber);
            });
        });
    };
    return LoginController;
}());
module.exports = new LoginController();
