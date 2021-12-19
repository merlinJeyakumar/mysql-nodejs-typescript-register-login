import {Router, Request, Response, NextFunction} from "express";
import PostController from "../controllers/PostController";

class PostRouter {
    private _router = Router();
    private _controller = PostController;

    get router() {
        return this._router;
    }

    constructor() {
        this.configure();
    }

    private configure() {
        this._router.post('/addPost', (req: Request, res: Response, next: NextFunction) => {
            //this._controller.withdraw(req, res);
        })
        this._router.post('/removePost', (req: Request, res: Response, next: NextFunction) => {
            //this._controller.withdraw(req, res);
        })
        this._router.post('/getPost', (req: Request, res: Response, next: NextFunction) => {
            //this._controller.withdraw(req, res);
        })
        this._router.post('/getPostList', (req: Request, res: Response, next: NextFunction) => {
            //this._controller.withdraw(req, res);
        })
    }
}

export = new PostRouter().router;