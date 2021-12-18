import {Request, Response} from 'express';
import {Connect, Query, ResultModel} from '../job/DatabaseJob'
import {BaseResponseModel} from "../model/BaseResponseModel";
import {UserModel} from "../model/UserModel";
import jwt from "jsonwebtoken";


class RegisterController {
    signup(req: Request, response: Response) {
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
            let promiseUserExistenceQuery = new Promise<UserModel>(async (resolve, reject) => {
                let existenceQuery = `SELECT EXISTS(SELECT * FROM Users WHERE userName="${userName}" LIMIT 1) AS value;`
                let insertQuery = "INSERT INTO Users (firstName, lastName, password, userName)" +
                    `VALUES ('${firstName}','${lastName}','${password}','${userName}')` +
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
                    let res_ :ResultModel  = (<ResultModel>res)
                    return new UserModel((<ResultModel>res_).result[0]);
                }))
            }).then((userModel) => {
                // const token = jwt.sign({
                //         username: "userName",
                //         userId: "my_id"
                //     },
                //     'SECRETKEY', {
                //         expiresIn: '1m'
                //     }
                // );
                let baseResponseModel = new BaseResponseModel("success", 1,200, userModel.getJson())
                response.json(baseResponseModel.getJson())
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel(reason, 0,200, null).getJson())
            }).finally(() => {
                connection.end();
            })
        })
    }
}

export = new RegisterController();