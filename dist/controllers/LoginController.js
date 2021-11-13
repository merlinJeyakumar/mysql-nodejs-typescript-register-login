"use strict";
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.defaultMethod = function () {
        return { text: "you reached a login" };
    };
    LoginController.prototype.login = function (req) {
        var id = req.query.id;
        var password = req.query.password;
        console.log("> login request");
        if (id == null) {
            return { text: "invalid login id spec" };
        }
        if (password == null) {
            return { text: "invalid login password" };
        }
        return { text: "you logged in with " + id };
    };
    return LoginController;
}());
module.exports = new LoginController();
