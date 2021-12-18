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
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this._controller.withdraw(req, res);
        })
    }
}

export = new AccountRouter().router;