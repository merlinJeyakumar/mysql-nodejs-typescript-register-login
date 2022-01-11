"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const getErrorMessage = function (e) {
    if (e) {
        if (e instanceof Error) {
            return e.message;
        }
        else {
            return e;
        }
    }
    else {
        return "unexpected error";
    }
};
exports.getErrorMessage = getErrorMessage;
