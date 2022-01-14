"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor() {
        this.uid = "";
        this.status = 0;
        this.userName = "";
        this.firstName = "";
        this.lastName = "";
        this.mobileNumber = "";
        this.password = "";
    }
    set(uid, userName, firstName, lastName, mobileNumber, password) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = 1;
        this.mobileNumber = mobileNumber;
        this.userName = userName;
        this.password = password;
        return this;
    }
    setSqlResult(execResult) {
        if (!execResult || (execResult === null || execResult === void 0 ? void 0 : execResult.rows.length) == 0) {
            return undefined;
        }
        this.uid = execResult.rows[0].uid;
        this.firstName = execResult.rows[0].firstName;
        this.lastName = execResult.rows[0].lastName;
        this.status = execResult.rows[0].status;
        this.mobileNumber = execResult.rows[0].mobileNumber;
        this.userName = execResult.rows[0].userName;
        this.password = execResult.rows[0].password;
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
        };
    }
}
exports.UserModel = UserModel;
