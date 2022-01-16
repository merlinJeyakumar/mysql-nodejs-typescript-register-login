import {FieldInfo} from "mysql";

export class UserModel {
    uid: string = "";
    status: number = 0;
    username: string = ""
    first_name: string = "";
    last_name: string | undefined = "";
    mobile_number: string | undefined = "";
    password: string = "";

    public set(uid: string, userName: string, firstName: string, lastName: string | undefined, mobileNumber: string | undefined, password: string) {
        this.uid = uid;
        this.first_name = firstName;
        this.last_name = lastName;
        this.status = 1;
        this.mobile_number = mobileNumber;
        this.username = userName;
        this.password = password;
        return this;
    }

    public setSqlResult(execResult: { rows: any; fields: FieldInfo[] | undefined } | void) {
        if (!execResult || execResult?.rows.length == 0) {
            return undefined
        }
        this.uid = execResult.rows[0].uid;
        this.first_name = execResult.rows[0].firstName;
        this.last_name = execResult.rows[0].lastName;
        this.status = execResult.rows[0].status;
        this.mobile_number = execResult.rows[0].mobileNumber;
        this.username = execResult.rows[0].userName;
        this.password = execResult.rows[0].password
        return this;
    }

    getJson() {
        return {
            uid: this.uid,
            userName: this.username,
            firstName: this.first_name,
            lastName: this.last_name,
            mobileNumber: this.mobile_number,
            status: this.status
        }
    }
}