import {Request, Response} from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import {BaseResponseModel} from "../domain/model/BaseResponseModel";
import {UserModel} from "../domain/model/UserModel";
import {AuthenticationModel} from "../domain/model/AuthenticationModel";
import uuid = require("uuid");
import {cacheSession, clearSession, getTokenInRequest, verifyAuthorization} from "./utility/AuthenticationUtility";
import {getCurrentTimeStamp, getErrorMessage} from "../support/utility/Utility";
import {compareHashPassword, encryptStringAes, getPasswordHash} from "../support/EncryptionUtility";


class AccountController {
    async login(req: Request, response: Response) {
        let baseResponseBuilder = new BaseResponseModel()
        let username = req.query.userName as string;
        let password = req.query.password as string;

        response.status(200);
        if (!username || username.length < 6 || !password || password.length < 8) {
            return response.json(baseResponseBuilder.asFailure("invalid username/password").build().getJson());
        }

        Connect().then((connection) => {
            new Promise<UserModel>(async (resolve, reject) => {
                let execResult = await Query(connection, `SELECT * FROM users WHERE user_name = '${username}'`).catch(reason => {
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

    async register(req: Request, response: Response) {
        let baseResponseBuilder = new BaseResponseModel()
        let username = req.query.username as string;
        let first_name = req.query.first_name as string;
        let last_name = req.query.last_name as string;
        let password = req.query.password as string;

        if (!username || username.length < 6) {
            return response.json(baseResponseBuilder.asFailure("valid username required, more than six characters required").build().getJson());
        }

        if (!first_name || first_name.length < 3) {
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
                let insertQuery = "INSERT INTO users (first_name, last_name, password, user_name, uid, create_time, status)" +
                    `VALUES ('${first_name}','${last_name}','${await getPasswordHash(password)}','${username}','${uid}','${getCurrentTimeStamp()}',1);`

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
                    resolve(new UserModel().set(uid, username, first_name, last_name, undefined, password))
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
        let first_name = req.query.first_name as string;
        let last_name = req.query.last_name as string;
        let mobile_number = req.query.mobile_number as string;
        let password = req.query.password as string;
        let username = req.query.username as string;
        let updateMap = new Map<string, string>()

        if (first_name && (first_name.length < 6 || first_name.length > 16)) {
            return response.json(baseResponseBuilder.asFailure("invalid first name, it length could be more than six to 16").getJson())
        } else if (first_name){
            updateMap.set("first_name", first_name)
        }
        if (last_name && (last_name.length == 0 || last_name.length > 16)) {
            return response.json(baseResponseBuilder.asFailure("invalid last name, it length could be more than ").getJson())
        } else if (last_name) {
            updateMap.set("last_name", last_name)
        }
        if (mobile_number && (mobile_number.length < 6 || mobile_number.length > 13)) {
            return response.json(baseResponseBuilder.asFailure("invalid mobile number").getJson())
        } else if (mobile_number) {
            updateMap.set("mobile_number", mobile_number)
        }
        if (password && (password.length < 6 || mobile_number.length > 22)) {
            return response.json(baseResponseBuilder.asFailure("invalid password, it length could be more than six to 22").getJson())
        } else if (password) {
            updateMap.set("password", password)
        }
        if (username && (username.length < 6 || username.length > 16)) {
            return response.json(baseResponseBuilder.asFailure("invalid password, it length could be more than six to 16").getJson())
        } else if (username) {
            updateMap.set("username", username)
        }
        if (updateMap.size == 0) {
            return response.json(baseResponseBuilder.asFailure("invalid usage").getJson())
        }

        Connect().then(connection => {
            let query = "";
            let index = 0
            updateMap.forEach((value, key) => {
                query += `\`${key}\` = '${value}'`
                if (index < updateMap.size - 1) {
                    query += `,`
                }
                index++;
            })
            query = `UPDATE users SET ${query} WHERE (\`uid\` = '${uid}');`
            Query(connection, query).then(async value => {
                let token = await cacheSession(uid)
                baseResponseBuilder.setAuth(new AuthenticationModel(token.accessToken, token.refreshToken).getJson())
            }).catch(reason => {
                baseResponseBuilder.asFailure(reason)
            }).finally(()=>{
                connection.end()
                response.json(baseResponseBuilder.getJson())
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
            await clearSession(uid)
            req.statusCode = 200
            response.json(baseResponseBuilder.asSuccess().getJson())
        } catch (e: any) {
            req.statusCode = 401
            response.json(baseResponseBuilder.asFailure(getErrorMessage(e), 401).getJson())
        }
    }

    async refreshToken(req: Request, response: Response){

    }
}

export = new AccountController()