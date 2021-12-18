"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const AccountController_1 = __importDefault(require("../controllers/AccountController"));
class AccountRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._controller = AccountController_1.default;
        this.configure();
    }
    get router() {
        return this._router;
    }
    configure() {
        this._router.post('/', (req, res, next) => {
            this._controller.withdraw(req, res);
        });
    }
}
module.exports = new AccountRouter().router;
