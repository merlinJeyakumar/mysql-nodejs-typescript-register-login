"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var LoginRouter_1 = __importDefault(require("./LoginRouter"));
var RouterNewControllerA_1 = __importDefault(require("./RouterNewControllerA"));
var RouterNewControllerB_1 = __importDefault(require("./RouterNewControllerB"));
var MasterRouter = /** @class */ (function () {
    function MasterRouter() {
        this._router = (0, express_1.Router)();
        this._subRouterA = RouterNewControllerA_1.default;
        this._subRouterB = RouterNewControllerB_1.default;
        this._loginRouter = LoginRouter_1.default;
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
        this._router.use('/themeA', this._subRouterA);
        this._router.use('/themeB', this._subRouterB);
        this._router.use('/login', this._loginRouter);
    };
    return MasterRouter;
}());
module.exports = new MasterRouter().router;
