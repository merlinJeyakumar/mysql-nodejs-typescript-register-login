import { NextFunction, Request, Response, Router } from "express";
import LoginController from "../controllers/LoginController";

class LoginRouter {
    private _router = Router();
    private _controller = LoginController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.all('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(this._controller.login(req));
        })
    };
}

export = new LoginRouter().router