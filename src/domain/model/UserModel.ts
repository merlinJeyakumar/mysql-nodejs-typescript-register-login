import {FieldInfo} from "mysql";

export class UserModel {
    uid: string = "";
    status: number = 0;
    userName: string = ""
    firstName: string = "";
    lastName: string | undefined = "";
    mobileNumber: string | undefined = "";
    password: string = "";

    public set(uid: string, userName: string, firstName: string, lastName: string | undefined, mobileNumber: string | undefined, password: string) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = 1;
        this.mobileNumber = mobileNumber;
        this.userName = userName;
        return this;
    }

    public setSqlResult(execResult: { rows: any; fields: FieldInfo[] | undefined } | void) {
        if (!execResult || execResult?.rows.length == 0) {
            return undefined
        }
        this.uid = execResult.rows[0].uid;
        this.firstName = execResult.rows[0].firstName;
        this.lastName = execResult.rows[0].lastName;
        this.status = execResult.rows[0].status;
        this.mobileNumber = execResult.rows[0].mobileNumber;
        this.userName = execResult.rows[0].userName;
        this.password = execResult.rows[0].password
        return this;
    }

    getJson() {
        return {
            uid: this.uid,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            mobileNumber: this.mobileNumber,
            status: this.status
        }
    }
}