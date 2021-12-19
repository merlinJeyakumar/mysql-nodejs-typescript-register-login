"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(result) {
        this.id = 0;
        this.status = 0;
        this.userName = "";
        this.firstName = "";
        this.lastName = "";
        this.mobileNumber = "";
        this.id = result.id;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.status = result.status;
        this.mobileNumber = result.mobileNumber;
        this.userName = result.userName;
    }
    getJson() {
        return JSON.parse(JSON.stringify(this));
    }
}
exports.UserModel = UserModel;
