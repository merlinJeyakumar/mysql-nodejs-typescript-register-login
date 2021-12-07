import { Request } from "express";
import {Connect, Query, ResultModel} from "../job/DatabaseJob";
import { BaseResponseModel } from "../model/BaseResponseModel";
import { UserModel } from "../model/UserModel";


class LoginController {
    defaultMethod() {
        return { text: "you reached a login" };
    }

    login(req: Request) {
        let userName: String = req.query.userName as String;
        let password: String = req.query.password as String;

        console.log("> login request");

        if (userName == null) {
            return { text: "invalid userName" };
        }
        if (password == null) {
            return { text: "invalid login password" };
        }

        Connect().then((connection) => {
            const query = `SELECT * FROM Users WHERE userName = "${userName}" AND password = "${password}"`
            Query(connection, query).then((res) => {
                let res_ :ResultModel  = (<ResultModel>res)
                res_.result[0]
                const fields = res as any[0]
                const result = res as any[1]

                //const myArray = <MyType[]>value;


                if (result.length == 1) {
                    let responseModel = new BaseResponseModel("success",1,200, new UserModel(result))
                    return { text: responseModel };

                } else if (result.length > 1) {
                    return { text: "invalid access" };
                }
                else {
                    return { text: "invalid credential" };
                }
                console.log("JK", result.mobileNumber);
            });

        });
    }
}

export = new LoginController();