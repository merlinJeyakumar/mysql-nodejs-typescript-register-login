import {Request, Response} from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import {BaseResponseModel} from "../model/BaseResponseModel";
import {UserModel} from "../model/UserModel";


class LoginController {

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
            }).then((userModel) => {
                response.json(new BaseResponseModel("success", 1, 200, userModel.getJson()))
            }).catch(reason => {
                console.log(reason);
                response.json(new BaseResponseModel(reason, 0, 200, null).getJson())
            }).finally(() => {
                connection.end();
            })
        })
    }
}

export = new LoginController();