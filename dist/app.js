"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var MasterRouter_1 = __importDefault(require("./routers/MasterRouter"));
dotenv_1.default.config({
    path: '.env'
});
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.router = MasterRouter_1.default;
    }
    return Server;
}());
var server = new Server();
server.app.use('/api', server.router);
(function (port) {
    if (port === void 0) { port = process.env.APP_PORT || 5000; }
    server.app.listen(port, function () {
        console.log("listening http://localhost:" + port + "/api/");
    });
})();
