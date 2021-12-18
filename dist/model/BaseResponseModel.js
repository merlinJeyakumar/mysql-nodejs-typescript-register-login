"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseModel = void 0;
class BaseResponseModel {
    constructor(message, success, status, result) {
        this.status = 200;
        this.success = 1;
        this.message = "success";
        this.message = message;
        this.success = success;
        this.status = status;
        this.result = result;
    }
    getJson() {
        return JSON.parse(JSON.stringify(this));
    }
}
exports.BaseResponseModel = BaseResponseModel;
