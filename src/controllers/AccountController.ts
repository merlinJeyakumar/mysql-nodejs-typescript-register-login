import {Request, Response} from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import {BaseResponseModel} from "../domain/model/BaseResponseModel";
import jwt from "jsonwebtoken";
import config from "../config/Configuration";
import {getAccessToken, getRefreshToken} from "../job/JwtJob";
import {UserModel} from "../domain/model/UserModel";
import {AuthenticationModel} from "../domain/model/AuthenticationModel";
import redis = require("redis");
import uuid = require("uuid");
import {getRedisAccessToken, putRedisAccessToken, putRedisRefreshToken} from "../job/RedisJob";
import {v4} from "uuid";
import {cacheSession, getTokenInRequest, verifyAuthorization} from "./utility/AuthenticationUtility";
import {getErrorMessage} from "../support/utility/Utility";

const redisClient = redis.createClient;


class AccountController {
    login(req: Request, response: Response) {
        let userName: String = req.query.userName as String;
        let password: String = req.query.password as String;

        console.log("> login request");

        if (userName == null) {
            return {text: "invalid userName"};
        }
        if (password == null) {
            return {text: "invalid login password"};
        }

        response.status(200);
        Connect().then((connection) => {
            new Promise<UserModel>(async (resolve, reject) => {
                const query = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${password}"`;

                let resultModel = (<ResultModel>await Query(connection, query))

                if (resultModel.result.length == 1) {
                    resolve(new UserModel(resultModel.result[0]));

                } else if (resultModel.result.length > 1) {
                    reject("invalid access");

                } else {
                    reject("invalid credential");
                }
            }).then(async (userModel) => {

                let refreshToken = getRefreshToken({
                    username: userModel.userName,
                    uid: userModel.uid
                })
                let accessToken = getAccessToken(userModel)
                let baseResponseModel = new BaseResponseModel(
                    "success",
                    1,
                    userModel,
                    new AuthenticationModel(accessToken, refreshToken).getJson())
                await putRedisAccessToken(userModel.uid.toString(), accessToken)
                await putRedisRefreshToken(userModel.uid.toString(), refreshToken)
                response.json(baseResponseModel)
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel(reason, 0, null, null).getJson())
            }).finally(() => {
                connection.end();
            })
        })
    }

    register(req: Request, response: Response) {
        let userName = req.query.userName as String;
        let firstName = req.query.firstName as String;
        let lastName = req.query.lastName as String;
        let password = req.query.password as String;

        if (userName == null) {
            return {text: "User name required"};
        }

        if (firstName == null || firstName.length < 3) {
            return {text: "please enter valid first name"};
        }

        if (password == null || firstName.length < 5) {
            return {text: "password should be valid, minimum 5 characters"};
        }
        response.status(200);
        Connect().then((connection) => {
            new Promise<UserModel>(async (resolve, reject) => {
                let existenceQuery = `SELECT EXISTS(SELECT * FROM Users WHERE userName="${userName}" LIMIT 1) AS value;`
                let insertQuery = "INSERT INTO Users (firstName, lastName, password, userName, uid)" +
                    `VALUES ('${firstName}','${lastName}','${password}','${userName}','${uuid.v4()}')` +
                    "ON DUPLICATE KEY " +
                    `UPDATE firstName='${firstName}', lastName='${lastName}', password='${password}'`;
                const userQuery = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${password}"`

                let promiseExistence: any = await Query(connection, existenceQuery)

                if ((<ResultModel>promiseExistence).result[0].value == 1) {
                    reject("account already exist")
                    return
                }
                await Query(connection, insertQuery);
                resolve(await Query(connection, userQuery).then((res) => {
                    let res_: ResultModel = (<ResultModel>res)
                    return new UserModel((<ResultModel>res_).result[0]);
                }))
            }).then(async (userModel) => {
                await cacheSession(userModel.uid,userModel.userName) //todo: handle response and token as resp output
                // let baseResponseModel = new BaseResponseModel(
                //     "success",
                //     1,
                //     userModel,
                //     new AuthenticationModel(accessToken, refreshToken).getJson())
                // await putRedisAccessToken(userModel.uid.toString(), accessToken)
                // await putRedisRefreshToken(userModel.uid.toString(), refreshToken)
                //response.json(baseResponseModel.getJson())
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel(reason, 0, null, null).getJson())
            }).finally(() => {
                connection.end();
            })
        })
    }

    /**
     * uid:int
     * token:Authorization-string
     */
    async logout(req: Request, response: Response) {
        let uid = req.query.uid as string;
        if (!uid) {
            return response.json(new BaseResponseModel("uid required", 0, null, null).getJson())
        }
        try {
            await verifyAuthorization(getTokenInRequest(req), uid)
            req.statusCode = 200
        } catch (e: any) {
            req.statusCode = 401
            response.json(new BaseResponseModel(getErrorMessage(e), 0, null, null).getJson())
        }
    }
}

export = new AccountController()