import {Request, Response} from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import {BaseResponseModel} from "../domain/model/BaseResponseModel";
import {UserModel} from "../domain/model/UserModel";
import {AuthenticationModel} from "../domain/model/AuthenticationModel";
import uuid = require("uuid");
import {cacheSession, getTokenInRequest, verifyAuthorization} from "./utility/AuthenticationUtility";
import {getErrorMessage} from "../support/utility/Utility";
import {encryptStringAes} from "../support/EncryptionUtility";
import config from "../config/Configuration";


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
                const query = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${encryptStringAes(password, (<string>config.server.secretKey))}"`;
                console.log("JeyK: query ", query, +"password: "+password)
                let execResult = await Query(connection, query)

                if (execResult.rows.length == 1) {
                    resolve(new UserModel().setSqlResult(execResult));

                } else if (execResult.rows.length > 1) {
                    reject("invalid access");

                } else {
                    reject("invalid credential");
                }
            }).then(async (userModel) => {
                let token = await cacheSession(userModel.uid)
                baseResponseBuilder.setResult(new AuthenticationModel(token.accessToken, token.refreshToken).getJson())
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
            return response.json(baseResponseBuilder.asFailure("first name required, more than three characters").build().getJson());
        }

        if (!password || password.length < 8) {
            return response.json(baseResponseBuilder.asFailure("password could be more than eight characters required").build().getJson());
        }

        response.status(200);
        Connect().then((connection) => {
            let baseResponseBuilder = new BaseResponseModel()
            new Promise<UserModel>(async (resolve, reject) => {
                const uid = uuid.v4()
                let insertQuery = "INSERT INTO Users (firstName, lastName, password, userName, uid)" +
                    `VALUES ('${firstName}','${lastName}','${encryptStringAes(password, (<string>config.server.secretKey))}','${userName}','${uid}');`

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
                    resolve(new UserModel().set(uid, userName, firstName, lastName, undefined))
                }
            }).then(async userModel => {
                let token = await cacheSession(userModel.uid)
                baseResponseBuilder.setResult(new AuthenticationModel(token.accessToken, token.refreshToken).getJson())
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
            req.statusCode = 200
        } catch (e: any) {
            req.statusCode = 401
            response.json(baseResponseBuilder.asFailure(getErrorMessage(e), 401).getJson())
        }
    }
}

export = new AccountController()