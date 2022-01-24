"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const AccountRouter_1 = __importDefault(require("./AccountRouter"));
const PostRouter_1 = __importDefault(require("./PostRouter"));
class MasterRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._accountRouter = AccountRouter_1.default;
        this._postRouter = PostRouter_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.all('/', (req, res) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<B>HelloWorld</B>");
            res.end();
        });
        this._router.use('/account', this._accountRouter);
        this._router.use('/post', this._postRouter);
    }
}
module.exports = new MasterRouter().router;
