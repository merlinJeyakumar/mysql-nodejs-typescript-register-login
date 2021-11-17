import { Request, Response } from 'express';
import { Connect, Query } from '../job/DatabaseJob'


class RegisterController {
    signup(req: Request, response: Response) {
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
            let existingCheckWrappe = new Promise<boolean>((resolve, reject) => {
                let query = `SELECT EXISTS(SELECT 1 FROM Users WHERE mobileNumber="${mobileNumber}" LIMIT 1)`
                Query(connection, query).then((array: any) => {
                    let result = array[0];
                    let row = array[1];
                    const valueExist: boolean = Object.entries(row[0])[0][1] == 1
                    console.log("valueExist: ", valueExist);
                    resolve(valueExist) //when no user existed
                }).catch((error) => {
                    reject(error.message);
                    console.log(error.message);
                    connection.end();
                })
            });

            Promise.allSettled([existingCheckWrappe]).then((value) => {
                let allValues = value.filter(c => c.status === 'fulfilled')
                    .map(c => <PromiseFulfilledResult<any>>c)
                    .map(c => c.value)[0];

                console.log("JK", allValues);

                if (allValues) {
                    response.status(200).json({
                        message: "email already exists"
                    });
                    connection.end();
                    return;
                }

                let query = "INSERT INTO Users (firstName, lastName, password, mobileNumber)" +
                    `VALUES ('${firstName}','${lastName}','${password}','${mobileNumber}')` +
                    "ON DUPLICATE KEY " +
                    `UPDATE firstName='${firstName}', lastName='${lastName}', password='${password}'`;

                Query(connection, query).then((result) => {
                    response.status(200).json({
                        firstName: firstName,
                        lastName: lastName,
                        mobileNumber: mobileNumber
                    });
                }).catch((error) => {
                    response.status(200).json({
                        message: error.message,
                        error
                    });
                }).finally(() => {
                    connection.end();
                });
            })
        })
    }
}

export = new RegisterController();