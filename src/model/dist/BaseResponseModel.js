"use strict";
exports.__esModule = true;
exports.BaseResponseModel = void 0;
var BaseResponseModel = /** @class */ (function () {
    function BaseResponseModel(message, status, result) {
        this.message = "success";
        this.status = 200;
        this.message = message;
        this.status = status;
        this.result = result;
    }
    return BaseResponseModel;
}());
exports.BaseResponseModel = BaseResponseModel;
