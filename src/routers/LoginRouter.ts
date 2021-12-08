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
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this._controller.login(req,res)
        })
    };
}

export = new LoginRouter().router