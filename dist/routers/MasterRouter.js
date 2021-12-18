"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const AccountRouter_1 = __importDefault(require("./AccountRouter"));
const LoginRouter_1 = __importDefault(require("./LoginRouter"));
const RegisterRouter_1 = __importDefault(require("./RegisterRouter"));
class MasterRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._loginRouter = LoginRouter_1.default;
        this._registerRouter = RegisterRouter_1.default;
        this._accountRouter = AccountRouter_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.use('/login', this._loginRouter);
        this._router.use('/register', this._registerRouter);
        this._router.use('/account', this._accountRouter);
    }
}
module.exports = new MasterRouter().router;
