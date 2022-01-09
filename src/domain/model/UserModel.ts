import {FieldInfo} from "mysql";

export class UserModel {
    uid: string = "";
    status: number = 0;
    userName: string = ""
    firstName: string = "";
    lastName: string | undefined = "";
    mobileNumber: string | undefined = "";

    public set(uid: string, userName: string, firstName: string, lastName: string | undefined, mobileNumber: string | undefined) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = 1;
        this.mobileNumber = mobileNumber;
        this.userName = userName;
        return this;
    }

    public setSqlResult(execResult: { rows: any; fields: FieldInfo[] | undefined }) {
        this.uid = execResult.rows.uid;
        this.firstName = execResult.rows.firstName;
        this.lastName = execResult.rows.lastName;
        this.status = execResult.rows.status;
        this.mobileNumber = execResult.rows.mobileNumber;
        this.userName = execResult.rows.userName;
        return this;
    }

    getJson() {
        return JSON.parse(JSON.stringify(this))
    }
}