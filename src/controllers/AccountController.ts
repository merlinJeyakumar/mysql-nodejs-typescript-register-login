import {Request, Response} from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import {BaseResponseModel} from "../model/BaseResponseModel";
import jwt from "jsonwebtoken";
import config from "../config/Configuration";


class AccountController {
    withdraw(req: Request, response: Response) {
        const token = (<String>req.headers.a).split(' ')[1];
        let decoded
        try {
            decoded = jwt.verify(
                token,
                (<string>config.server.secretKey)
            );
        } catch (e) {
            req.statusCode = 401
            req.statusMessage = "unauthorized"
            return response.json(new BaseResponseModel("unauthorized", 0, 401, null))
        }
    }
}

export = new AccountController()