"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor() {
        this.uid = "";
        this.status = 0;
        this.username = "";
        this.first_name = "";
        this.last_name = "";
        this.mobile_number = "";
        this.password = "";
    }
    set(uid, userName, firstName, lastName, mobileNumber, password) {
        this.uid = uid;
        this.first_name = firstName;
        this.last_name = lastName;
        this.status = 1;
        this.mobile_number = mobileNumber;
        this.username = userName;
        this.password = password;
        return this;
    }
    setSqlResult(execResult) {
        if (!execResult || (execResult === null || execResult === void 0 ? void 0 : execResult.rows.length) == 0) {
            return undefined;
        }
        this.uid = execResult.rows[0].uid;
        this.first_name = execResult.rows[0].firstName;
        this.last_name = execResult.rows[0].lastName;
        this.status = execResult.rows[0].status;
        this.mobile_number = execResult.rows[0].mobileNumber;
        this.username = execResult.rows[0].userName;
        this.password = execResult.rows[0].password;
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
        };
    }
}
exports.UserModel = UserModel;
