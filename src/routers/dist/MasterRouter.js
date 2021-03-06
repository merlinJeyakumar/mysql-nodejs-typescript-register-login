"use strict";
var express_1 = require("express");
var LoginRouter_1 = require("./LoginRouter");
var RegisterRouter_1 = require("./RegisterRouter");
var MasterRouter = /** @class */ (function () {
    function MasterRouter() {
        this._router = express_1.Router();
        this._loginRouter = LoginRouter_1["default"];
        this._registerRouter = RegisterRouter_1["default"];
        this._configure();
    }
    Object.defineProperty(MasterRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    MasterRouter.prototype._configure = function () {
        this._router.use('/login', this._loginRouter);
        this._router.use('/register', this._registerRouter);
    };
    return MasterRouter;
}());
module.exports = new MasterRouter().router;
