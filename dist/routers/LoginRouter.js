"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
class LoginRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._controller = LoginController_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post('/', (req, res, next) => {
            this._controller.login(req, res);
        });
    }
    ;
}
module.exports = new LoginRouter().router;
