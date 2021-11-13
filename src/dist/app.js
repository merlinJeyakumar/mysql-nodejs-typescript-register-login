"use strict";
exports.__esModule = true;
var express_1 = require("express");
var MasterRouter_1 = require("./routers/MasterRouter");
var configuration_1 = require("./config/configuration");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1["default"]();
        this.router = MasterRouter_1["default"];
    }
    return Server;
}());
var server = new Server();
server.app.use('/api', server.router);
(function (port) {
    if (port === void 0) { port = configuration_1["default"].server.port; }
    server.app.listen(port, function () {
        console.log("listening http://localhost:" + port + "/api/");
    });
})();
