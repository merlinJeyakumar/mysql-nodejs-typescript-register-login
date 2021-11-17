import mysql from "mysql"
import params from "../config/dbconfig";

const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection(params)
        connection.connect((error) => {
            if (error) {
                reject(error)
                return;
            }
            resolve(connection);
        });
    });

const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error, row, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve([result, row, error]);
        });
    });



export { Connect, Query };