"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel(result) {
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
    return UserModel;
}());
exports.UserModel = UserModel;
