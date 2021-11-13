import { Router } from "express";
import LoginRouter from "./LoginRouter";
import RegisterRouter from "./RegisterRouter";

class MasterRouter {
    private _router = Router();
    private _loginRouter = LoginRouter;
    private _registerRouter = RegisterRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/login', this._loginRouter);
        this._router.use('/register', this._registerRouter)
    }
}

export = new MasterRouter().router;