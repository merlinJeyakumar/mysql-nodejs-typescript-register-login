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
    }
    set(uid, userName, firstName, lastName, mobileNumber) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = 1;
        this.mobileNumber = mobileNumber;
        this.userName = userName;
        return this;
    }
    setSqlResult(execResult) {
        this.uid = execResult.rows[0].uid;
        this.firstName = execResult.rows[0].firstName;
        this.lastName = execResult.rows[0].lastName;
        this.status = execResult.rows[0].status;
        this.mobileNumber = execResult.rows[0].mobileNumber;
        this.userName = execResult.rows[0].userName;
        return this;
    }
    getJson() {
        return JSON.parse(JSON.stringify(this));
    }
}
exports.UserModel = UserModel;
