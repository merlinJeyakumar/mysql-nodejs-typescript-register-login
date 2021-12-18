import { Router } from "express";
import AccountRouter from "./AccountRouter";
import LoginRouter from "./LoginRouter";
import RegisterRouter from "./RegisterRouter";

class MasterRouter {
    private _router = Router();
    private _loginRouter = LoginRouter;
    private _registerRouter = RegisterRouter;
    private _accountRouter = AccountRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/login', this._loginRouter);
        this._router.use('/register', this._registerRouter)
        this._router.use('/account', this._accountRouter)
    }
}

export = new MasterRouter().router;