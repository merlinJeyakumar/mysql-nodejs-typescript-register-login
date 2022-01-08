import {Router, Request, Response, NextFunction} from "express";
import AccountController from "../controllers/AccountController";

class AccountRouter {
    private _router = Router();
    private _controller = AccountController;

    get router() {
        return this._router;
    }

    constructor() {
        this.configure();
    }

    private configure() {
        this._router.post('/login', (req: Request, res: Response, next: NextFunction) => {
            this._controller.login(req, res);
        })
        this._router.post('/register', (req: Request, res: Response, next: NextFunction) => {
            this._controller.register(req, res);
        })
        this._router.all('/logout', (req: Request, res: Response, next: NextFunction) => {
            this._controller.logout(req, res);
        })
    }
}

export = new AccountRouter().router;