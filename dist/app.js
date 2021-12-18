"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MasterRouter_1 = __importDefault(require("./routers/MasterRouter"));
const Configuration_1 = __importDefault(require("./config/Configuration"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = MasterRouter_1.default;
    }
}
const server = new Server();
server.app.use('/api', server.router);
((port = Configuration_1.default.server.port) => {
    server.app.listen(port, () => {
        console.log(`listening http://localhost:${port}/api/`);
    });
})();
