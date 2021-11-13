import { Request, Response } from 'express';
import { Connect, Query } from '../job/DatabaseJob'


class RegisterController {
    signup(req: Request, res: Response) {
        let mobileNumber = req.query.mobileNumber as String;
        let firstName = req.query.firstName as String;
        let lastName = req.query.lastName as String;
        let password = req.query.password as String;

        if (mobileNumber == null) {
            return { text: "Mobile number required" };
        }

        if (firstName == null || firstName.length < 3) {
            return { text: "please enter valid first name" };
        }

        if (password == null || firstName.length < 5) {
            return { text: "password should be valid, minimum 5 characters" };
        }

        let query = "INSERT INTO Users (firstName, lastName, password, mobileNumber)" +
            `VALUES ('${firstName}','${lastName}','${password}','${mobileNumber}')` +
            "ON DUPLICATE KEY " +
            `UPDATE firstName='${firstName}', lastName='${lastName}', password='${password}'`

        Connect().then((connection) => {
            Query(connection, query).then((result) => {
                return res.status(200).json({
                    result
                });
            }).catch((error) => {
                return res.status(200).json({
                    message: error.message,
                    error
                });
            }).finally(() => {
                connection.end();
            });
        });
    }
}

export = new RegisterController();