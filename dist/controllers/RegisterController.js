"use strict";
var RegisterController = /** @class */ (function () {
    function RegisterController() {
    }
    RegisterController.prototype.signup = function (req) {
        var mobileNumber = req.query.mobileNumber;
        var firstName = req.query.firstName;
        var lastName = req.query.lastName;
        var password = req.query.password;
        if (mobileNumber == null) {
            return { text: "Mobile number required" };
        }
        if (firstName == null || firstName.length < 3) {
            return { text: "please enter valid first name" };
        }
        if (password == null || firstName.length < 5) {
            return { text: "password should be valid, minimum 5 characters" };
        }
        //todo: 
    };
    return RegisterController;
}());
module.exports = new RegisterController();
