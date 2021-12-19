import { Router } from "express";
import AccountRouter from "./AccountRouter";
import PostRouter from "./PostRouter";

class MasterRouter {
    private _router = Router();
    private _accountRouter = AccountRouter;
    private _postRouter = PostRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/account', this._accountRouter)
        this._router.use('/post', this._postRouter)
    }
}

export = new MasterRouter().router;