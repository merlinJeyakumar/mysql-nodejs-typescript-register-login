import { NextFunction, Request, Response, Router } from "express";
import NewControllerB from "../controllers/NewControllerB";

class RouterNewControllerB {
    private _router = Router();
    private _controller = NewControllerB;

    get router() {
        return this._router
    }

    constructor() {
        this._configure()
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(this._controller.defaultMethod())
        });
    }
}

export = new RouterNewControllerB().router;