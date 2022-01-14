"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseModel = void 0;
class BaseResponseModel {
    constructor() {
        this.status = 1;
        this.message = "success";
    }
    /*constructor(message: String, status: number, result: any, auth: any) {
        this.message = message;
        this.status = status
        this.result = result;
        this.auth = auth
    }*/
    getJson() {
        return JSON.parse(JSON.stringify(this));
    }
    setStatus(status) {
        this.status = status;
        return this;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    setAuth(auth) {
        this.auth = auth;
    }
    setResult(result) {
        this.result = result;
        return this;
    }
    asSuccess(message = "successful", status = 1) {
        this.message = message;
        this.status = status;
        return this;
    }
    asFailure(message = "failed", status = 0) {
        this.message = message;
        this.status = status;
        return this;
    }
    build() {
        return this;
    }
}
exports.BaseResponseModel = BaseResponseModel;
