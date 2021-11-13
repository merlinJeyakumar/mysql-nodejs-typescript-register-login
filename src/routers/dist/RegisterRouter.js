"use strict";
var express_1 = require("express");
var RegisterController_1 = require("../controllers/RegisterController");
var RegisterRouter = /** @class */ (function () {
    function RegisterRouter() {
        this._router = express_1.Router();
        this._controller = RegisterController_1["default"];
        this.configure();
    }
    Object.defineProperty(RegisterRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    RegisterRouter.prototype.configure = function () {
        var _this = this;
        this._router.get('/', function (req, res, next) {
            res.status(200).json(_this._controller.signup(req));
        });
    };
    return RegisterRouter;
}());
module.exports = new RegisterRouter().router;
