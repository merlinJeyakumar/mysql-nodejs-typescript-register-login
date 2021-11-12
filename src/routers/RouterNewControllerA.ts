import { NextFunction, Request, Response, Router } from "express";
import NewControllerA from "../controllers/NewControllerA";

class RouterNewControllerA {
    private _router = Router();
    private _controller = NewControllerA;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(this._controller.defaultMethod());
        })
    };
}

export = new RouterNewControllerA().router