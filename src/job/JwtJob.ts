import jwt from "jsonwebtoken";
import config from "../config/Configuration";

export const verifyToken = function (token: string) {
    try {
        if (!token) {
            throw new Error("invalid token")
        }
        let verifiedResult = jwt.verify(
            token,
            (<string>config.server.secretKey)
        )
        //req.statusCode = 200
        return verifiedResult
    } catch (e) {
        //req.statusCode = 401
        throw new Error("authentication failed")
    }
}

export const getRefreshToken = function (payload: any): string {
    return jwt.sign(payload,
        (<string>config.server.secretKey), {
            expiresIn: '30d'
        }
    );
}

export const getAccessToken = function (payload: any): string {
    return jwt.sign(payload,
        (<string>config.server.secretKey), {
            expiresIn: '1d'
        }
    );
}