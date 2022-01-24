import {Router} from "express";
import AccountRouter from "./AccountRouter";
import PostRouter from "./PostRouter";

class MasterRouter {
    private ROUTE_API = "/api"

    private _router = Router();
    private _accountRouter = AccountRouter;
    private _postRouter = PostRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/',(req, res) => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("<B>HelloWorld</B>");
            res.end();
        })
        this._router.use(`${this.ROUTE_API}/account`, this._accountRouter)
        this._router.use(`${this.ROUTE_API}/post`, this._postRouter)
    }
}

export = new MasterRouter().router;