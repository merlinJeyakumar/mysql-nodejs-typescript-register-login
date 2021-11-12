"use strict";
var express_1 = require("express");
var LoginController_1 = require("../controllers/LoginController");
var LoginRouter = /** @class */ (function () {
    function LoginRouter() {
        this._router = express_1.Router();
        this._controller = LoginController_1["default"];
        this._configure();
    }
    Object.defineProperty(LoginRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    LoginRouter.prototype._configure = function () {
        var _this = this;
        this._router.get('/', function (req, res, next) {
            res.status(200).json(_this._controller.login(req));
        });
    };
    ;
    return LoginRouter;
}());
module.exports = new LoginRouter().router;
