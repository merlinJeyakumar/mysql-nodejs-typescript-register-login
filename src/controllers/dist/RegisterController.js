"use strict";
var DatabaseJob_1 = require("../job/DatabaseJob");
var RegisterController = /** @class */ (function () {
    function RegisterController() {
    }
    RegisterController.prototype.signup = function (req, res) {
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
        var query = "INSERT INTO Users (firstName, lastName, password, mobileNumber)" +
            ("VALUES ('" + firstName + "','" + lastName + "','" + password + "','" + mobileNumber + "')") +
            "ON DUPLICATE KEY " +
            ("UPDATE firstName='" + firstName + "', lastName='" + lastName + "', password='" + password + "'");
        DatabaseJob_1.Connect().then(function (connection) {
            DatabaseJob_1.Query(connection, query).then(function (result) {
                return res.status(200).json({
                    result: result
                });
            })["catch"](function (error) {
                return res.status(200).json({
                    message: error.message,
                    error: error
                });
            })["finally"](function () {
                connection.end();
            });
        });
    };
    return RegisterController;
}());
module.exports = new RegisterController();
