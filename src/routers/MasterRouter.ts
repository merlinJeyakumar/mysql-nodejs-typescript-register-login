import { Router } from "express";
import LoginRouter from "./LoginRouter";

class MasterRouter {
    private _router = Router();
    private _loginRouter = LoginRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/login', this._loginRouter);
    }
}

export = new MasterRouter().router;