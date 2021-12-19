import { Router } from "express";
import AccountRouter from "./AccountRouter";

class MasterRouter {
    private _router = Router();
    private _accountRouter = AccountRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/post', this._accountRouter)
        this._router.use('/account', this._accountRouter)
    }
}

export = new MasterRouter().router;