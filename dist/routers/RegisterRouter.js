"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const RegisterController_1 = __importDefault(require("../controllers/RegisterController"));
class RegisterRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._controller = RegisterController_1.default;
        this.configure();
    }
    get router() {
        return this._router;
    }
    configure() {
        this._router.post('/', (req, res, next) => {
            this._controller.signup(req, res);
        });
    }
}
module.exports = new RegisterRouter().router;
