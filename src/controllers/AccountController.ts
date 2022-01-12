import {Request, Response} from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import {BaseResponseModel} from "../domain/model/BaseResponseModel";
import {UserModel} from "../domain/model/UserModel";
import {AuthenticationModel} from "../domain/model/AuthenticationModel";
import uuid = require("uuid");
import {cacheSession, clearSession, getTokenInRequest, verifyAuthorization} from "./utility/AuthenticationUtility";
import {getErrorMessage} from "../support/utility/Utility";
import {compareHashPassword, encryptStringAes, getPasswordHash} from "../support/EncryptionUtility";


class AccountController {
    login(req: Request, response: Response) {
        let baseResponseBuilder = new BaseResponseModel()
        let userName = req.query.userName as string;
        let password = req.query.password as string;

        response.status(200);
        if (!userName || userName.length < 6 || !password || password.length < 8) {
            return response.json(baseResponseBuilder.asFailure("invalid username/password").build().getJson());
        }

        Connect().then((connection) => {
            new Promise<UserModel>(async (resolve, reject) => {
                let execResult = await Query(connection, `SELECT * FROM Users WHERE userName = '${userName}'`).catch(reason => {
                    reject(reason)
                })
                const userModel = new UserModel().setSqlResult(execResult);
                if (userModel && await compareHashPassword(password, userModel.password)) {
                    resolve(userModel)
                } else {
                    reject("invalid credentials")
                }
            }).then(async (userModel) => {
                let token = await cacheSession(userModel.uid)
                baseResponseBuilder.setAuth(new AuthenticationModel(token.accessToken, token.refreshToken).getJson())
                baseResponseBuilder.setResult(userModel.getJson())
                baseResponseBuilder.asSuccess()
            }).catch(reason => {
                console.log(reason);
                baseResponseBuilder.asFailure(getErrorMessage(reason))
            }).finally(() => {
                connection.end();
                response.json(baseResponseBuilder.build().getJson())
            })
        })
    }

    register(req: Request, response: Response) {
        let baseResponseBuilder = new BaseResponseModel()
        let userName = req.query.userName as string;
        let firstName = req.query.firstName as string;
        let lastName = req.query.lastName as string;
        let password = req.query.password as string;

        if (!userName || userName.length < 6) {
            return response.json(baseResponseBuilder.asFailure("valid username required, more than six characters required").build().getJson());
        }

        if (!firstName || firstName.length < 3) {
            return response.json(baseResponseBuilder.asFailure("valid first name required, more than three characters").build().getJson());
        }

        if (!password || password.length < 8) {
            return response.json(baseResponseBuilder.asFailure("valid password required, could be more than eight characters").build().getJson());
        }

        response.status(200);
        Connect().then((connection) => {
            let baseResponseBuilder = new BaseResponseModel()
            new Promise<UserModel>(async (resolve, reject) => {
                const uid = uuid.v4()
                let insertQuery = "INSERT INTO Users (firstName, lastName, password, userName, uid)" +
                    `VALUES ('${firstName}','${lastName}','${await getPasswordHash(password)}','${userName}','${uid}');`

                let execResult = await Query(connection, insertQuery).catch(reason => {
                    console.log(getErrorMessage(reason))
                    switch (reason.code) {
                        case "ER_DUP_ENTRY":
                            reject("user already exist")
                            break;
                        default:
                            reject("unexpected issue x001")
                            break;
                    }
                })
                if (execResult) {
                    resolve(new UserModel().set(uid, userName, firstName, lastName, undefined, password))
                }
            }).then(async userModel => {
                let token = await cacheSession(userModel.uid)
                baseResponseBuilder.setAuth(token)
                baseResponseBuilder.setResult(userModel)
            }).catch(reason => {
                console.log(reason);
                req.statusCode = 400
                baseResponseBuilder.asFailure(getErrorMessage(reason))
            }).finally(() => {
                connection.end();
                response.json(baseResponseBuilder.build().getJson())
            })
        })
    }

    async profileUpdate(req: Request, response: Response) {
        let baseResponseBuilder = new BaseResponseModel()
        let uid = req.query.uid as string;
        if (!uid) {
            return response.json(baseResponseBuilder.asFailure("uid required").getJson())
        }
        try {
            await verifyAuthorization(getTokenInRequest(req), uid) //authentication
            req.statusCode = 200
        } catch (e: any) {
            req.statusCode = 401
            return response.json(baseResponseBuilder.asFailure(getErrorMessage(e), 401).getJson())
        }
        let firstName = req.query.firstName as string;
        let lastName = req.query.lastName as string;
        let mobileNumber = req.query.mobileNumber as string;
        let password = req.query.password as string;
        let userName = req.query.userName as string;

        if (firstName && (firstName.length < 6 || firstName.length > 16)) {
            return response.json(baseResponseBuilder.asFailure("invalid first name, it length could be more than six to 16").getJson())
        }
        if (lastName && (lastName.length == 0 || lastName.length > 10)) {
            return response.json(baseResponseBuilder.asFailure("invalid last name, it length could be more than ").getJson())
        }
        if (mobileNumber && (mobileNumber.length < 6 || mobileNumber.length > 11)) {
            return response.json(baseResponseBuilder.asFailure("invalid mobile number").getJson())
        }
        if (password && (password.length < 6 || mobileNumber.length > 22)) {
            return response.json(baseResponseBuilder.asFailure("invalid password, it length could be more than six to 22").getJson())
        }
        if (userName && (userName.length < 6 || userName.length > 16)) {
            return response.json(baseResponseBuilder.asFailure("invalid password, it length could be more than six to 16").getJson())
        }
        if (!firstName && !lastName && !mobileNumber && !password && !userName) {
            return response.json(baseResponseBuilder.asFailure("invalid usage").getJson())
        }
        //todo: update to db and share a token
        let token = await cacheSession(uid)
        baseResponseBuilder.setAuth(new AuthenticationModel(token.accessToken, token.refreshToken).getJson())
    }

    /**
     * uid:int
     * token:Authorization-string
     */
    async logout(req: Request, response: Response) {
        let baseResponseBuilder = new BaseResponseModel()
        let uid = req.query.uid as string;
        if (!uid) {
            return response.json(baseResponseBuilder.asFailure("uid required").build().getJson())
        }
        try {
            await verifyAuthorization(getTokenInRequest(req), uid)
            await clearSession(uid)
            req.statusCode = 200
            response.json(baseResponseBuilder.asSuccess().getJson())
        } catch (e: any) {
            req.statusCode = 401
            response.json(baseResponseBuilder.asFailure(getErrorMessage(e), 401).getJson())
        }
    }
}

export = new AccountController()