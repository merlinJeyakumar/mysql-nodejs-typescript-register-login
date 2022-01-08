import {getRedisRefreshToken, putRedisAccessToken, putRedisRefreshToken} from "../../job/RedisJob";
import {getAccessToken, getRefreshToken, verifyToken} from "../../job/JwtJob";
import {Request} from "express";

export const getTokenInRequest = function (req: Request) {
    if (!req.headers.authorization) {
        throw new Error("invalid token")
    } else {
        return (<string>req.headers.authorization).split(' ')[1];
    }
}

export const cacheSession = async (uid: string, userName: string) => {
    let payload = {
        username: userName,
        uid: uid
    }
    let refreshToken: string = getRefreshToken(payload)
    let accessToken: string = getAccessToken(payload)
    await putRedisAccessToken(uid, accessToken)
    await putRedisRefreshToken(uid, refreshToken)
    return [refreshToken, accessToken]
}

export const verifyAuthorization = async (token: string, uid: string) => {
    if (!uid) {
        throw new Error("uid required")
    }
    let refreshToken = await getRedisRefreshToken(uid) //todo: register not updating redis
    if (!refreshToken) {
        let payload = verifyToken(token);
        console.log(`JeyK: ` + (<any>payload).uid == uid)
        console.log(`JeyK: ${(<any>payload).uid}`)
        console.log(`JeyK: ${uid}`)
        if ((<any>payload).uid == uid) {
            return true
        } else {
            throw new Error("unauthorized access")
        }
    } else {
        throw new Error("invalid authentication method")
    }
}