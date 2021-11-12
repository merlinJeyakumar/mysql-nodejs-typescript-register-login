import { Router } from "express";
import LoginRouter from "./LoginRouter";
import RouterNewControllerA from "./RouterNewControllerA";
import RouterNewControllerB from "./RouterNewControllerB";

class MasterRouter {
    private _router = Router();
    private _subRouterA = RouterNewControllerA;
    private _subRouterB = RouterNewControllerB;
    private _loginRouter = LoginRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/themeA', this._subRouterA);
        this._router.use('/themeB', this._subRouterB);
        this._router.use('/login', this._loginRouter);
    }
}

export = new MasterRouter().router;