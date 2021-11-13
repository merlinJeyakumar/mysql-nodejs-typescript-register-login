"use strict";
exports.__esModule = true;
var configuration_1 = require("./configuration");
var params = {
    user: configuration_1["default"].mysql.user,
    pass: configuration_1["default"].mysql.pass,
    host: configuration_1["default"].mysql.host,
    database: configuration_1["default"].mysql.database
};
exports["default"] = params;
