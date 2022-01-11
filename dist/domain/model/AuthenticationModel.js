"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModel = void 0;
class AuthenticationModel {
    constructor(accessToken, refreshToken) {
        this.accessToken = "";
        this.refreshToken = "";
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    getJson() {
        return JSON.parse(JSON.stringify(this));
    }
}
exports.AuthenticationModel = AuthenticationModel;
