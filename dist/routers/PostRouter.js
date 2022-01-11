"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
class PostRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._controller = PostController_1.default;
        this.configure();
    }
    get router() {
        return this._router;
    }
    configure() {
        this._router.post('/addPost', (req, res, next) => {
            this._controller.addPost(req, res);
        });
        this._router.post('/removePost', (req, res, next) => {
            //this._controller.withdraw(req, res);
        });
        this._router.post('/getPost', (req, res, next) => {
            //this._controller.withdraw(req, res);
        });
        this._router.post('/getPostList', (req, res, next) => {
            //this._controller.withdraw(req, res);
        });
    }
}
module.exports = new PostRouter().router;
