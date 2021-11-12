"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var NewControllerB_1 = __importDefault(require("../controllers/NewControllerB"));
var RouterNewControllerB = /** @class */ (function () {
    function RouterNewControllerB() {
        this._router = (0, express_1.Router)();
        this._controller = NewControllerB_1.default;
        this._configure();
    }
    Object.defineProperty(RouterNewControllerB.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    RouterNewControllerB.prototype._configure = function () {
        var _this = this;
        this._router.get('/', function (req, res, next) {
            res.status(200).json(_this._controller.defaultMethod());
        });
    };
    return RouterNewControllerB;
}());
module.exports = new RouterNewControllerB().router;
