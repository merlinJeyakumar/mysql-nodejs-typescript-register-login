import jwt, {JsonWebTokenError} from "jsonwebtoken";
import config from "../config/Configuration";
import {BaseResponseModel} from "../model/BaseResponseModel";
import {JwtCallback} from "../domain/callback/JwtCallback";
import {Request, Response} from "express";

const verify = function (req: Request, response: Response, jwtCallback: JwtCallback) {
    try {
        const token = (<String>req.headers.authorization).split(' ')[1];
        if (!token) {
            throw new JsonWebTokenError("invalid token")
        }
        let verifiedResult = jwt.verify(
            token,
            (<string>config.server.secretKey)
        )
        req.statusCode = 200
        jwtCallback(true, verifiedResult)
    } catch (e) {
        req.statusCode = 401
        response.json(new BaseResponseModel("authentication failed", 0, null))
        jwtCallback(false, undefined)
    }
}

export {verify}