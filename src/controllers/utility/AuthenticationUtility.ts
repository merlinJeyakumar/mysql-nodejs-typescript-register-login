import {
    clearRedisKey,
    getRedisAccessToken,
    getRedisRefreshToken,
    putRedisAccessToken,
    putRedisRefreshToken
} from "../../job/RedisJob";
import {getAccessToken, getRefreshToken, verifyToken} from "../../job/JwtJob";
import {Request} from "express";
import {decryptStringAes, encryptStringAes} from "../../support/EncryptionUtility";
import config from "../../config/Configuration";
import {getErrorMessage} from "../../support/utility/Utility";

export const getTokenInRequest = function (req: Request) {
    if (!req.headers.authorization) {
        throw new Error("invalid token")
    } else {
        return (<string>req.headers.authorization).split(' ')[1];
    }
}

export const cacheSession = async (uid: string) => {
    let payload = {
        uid: encryptStringAes(uid, (<string>config.server.secretKey))
    }
    let refreshToken: string = getRefreshToken(payload)
    let accessToken: string = getAccessToken(payload)
    await putRedisAccessToken(uid, accessToken)
    await putRedisRefreshToken(uid, refreshToken)
    console.log("cachedToken:", await getRedisAccessToken(uid))
    return {
        refreshToken,
        accessToken
    }
}

export const clearSession = async function (uid: string) {
    try {
        await clearRedisKey(uid)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const verifyAuthorization = async (token: string, uid: string) => {
    if (!uid) {
        throw new Error("uid required")
    }
    console.log("uid: ", uid)
    let refreshToken = await getRedisAccessToken(uid) //todo: register not updating redis
    console.log("refreshToken: ", refreshToken)
    if (refreshToken) {
        console.log("verifyToken: ",token)
        let payload = verifyToken(token);
        console.log(`JeyK: ` + (<any>payload).uid == uid)
        console.log(`JeyK: ${(<any>payload).uid}`)
        console.log(`JeyK: ${uid}`)
        let payloadUid = (<any>payload).uid;
        if (payloadUid) {
            payloadUid = decryptStringAes(payloadUid, (<string>config.server.secretKey))
        }
        if (payloadUid == uid) {
            return true
        } else {
            throw new Error("unauthorized access")
        }
    } else {
        throw new Error("invalid authentication method")
    }
}