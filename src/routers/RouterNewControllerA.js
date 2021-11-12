"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var NewControllerA_1 = __importDefault(require("../controllers/NewControllerA"));
var RouterNewControllerA = /** @class */ (function () {
    function RouterNewControllerA() {
        this._router = (0, express_1.Router)();
        this._controller = NewControllerA_1.default;
        this._configure();
    }
    Object.defineProperty(RouterNewControllerA.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    RouterNewControllerA.prototype._configure = function () {
        var _this = this;
        this._router.get('/', function (req, res, next) {
            res.status(200).json(_this._controller.defaultMethod());
        });
    };
    ;
    return RouterNewControllerA;
}());
module.exports = new RouterNewControllerA().router;
