"use strict";
var DatabaseJob_1 = require("../job/DatabaseJob");
var RegisterController = /** @class */ (function () {
    function RegisterController() {
    }
    RegisterController.prototype.signup = function (req, response) {
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
            var existingCheckWrappe = new Promise(function (resolve, reject) {
                var query = "SELECT EXISTS(SELECT 1 FROM Users WHERE mobileNumber=\"" + mobileNumber + "\" LIMIT 1)";
                DatabaseJob_1.Query(connection, query).then(function (array) {
                    var result = array[0];
                    var row = array[1];
                    var valueExist = Object.entries(row[0])[0][1] == 1;
                    console.log("valueExist: ", valueExist);
                    resolve(valueExist); //when no user existed
                })["catch"](function (error) {
                    reject(error.message);
                    console.log(error.message);
                    connection.end();
                });
            });
            Promise.allSettled([existingCheckWrappe]).then(function (value) {
                var allValues = value.filter(function (c) { return c.status === 'fulfilled'; })
                    .map(function (c) { return c; })
                    .map(function (c) { return c.value; })[0];
                console.log("JK", allValues);
                if (allValues) {
                    response.status(200).json({
                        message: "mobile number already exists"
                    });
                    connection.end();
                    return;
                }
                var query = "INSERT INTO Users (firstName, lastName, password, mobileNumber)" +
                    ("VALUES ('" + firstName + "','" + lastName + "','" + password + "','" + mobileNumber + "')") +
                    "ON DUPLICATE KEY " +
                    ("UPDATE firstName='" + firstName + "', lastName='" + lastName + "', password='" + password + "'");
                DatabaseJob_1.Query(connection, query).then(function (result) {
                    response.status(200).json({
                        firstName: firstName,
                        lastName: lastName,
                        mobileNumber: mobileNumber
                    });
                })["catch"](function (error) {
                    response.status(200).json({
                        message: error.message,
                        error: error
                    });
                })["finally"](function () {
                    connection.end();
                });
            });
        });
    };
    return RegisterController;
}());
module.exports = new RegisterController();
