import { Router, Request, Response, NextFunction } from "express";
import RegisterController from "../controllers/RegisterController";

class RegisterRouter {
    private _router = Router();
    private _controller = RegisterController;

    get router() {
        return this._router;
    }

    constructor() {
        this.configure();
    }

    private configure() {
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this._controller.signup(req, res);
        })
    }
}

export = new RegisterRouter().router;