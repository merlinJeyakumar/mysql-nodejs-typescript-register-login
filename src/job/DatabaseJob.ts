import mysql, {FieldInfo} from "mysql"
import RowDataPacket from 'mysql';
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
        connection.query(query, connection, (error, result, fields: FieldInfo[] | undefined) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(new ResultModel(fields, result));
        });
    });

export class ResultModel {
    fields: FieldInfo[];
    result: any;

    constructor(fields: any, result: any) {
        this.fields = fields;
        this.result = result;
    }
}


export {Connect, Query};