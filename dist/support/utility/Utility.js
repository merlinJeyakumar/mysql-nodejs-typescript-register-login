"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTimeStamp = exports.getErrorMessage = void 0;
const moment_1 = __importDefault(require("moment/moment"));
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
const getCurrentTimeStamp = function () {
    return (0, moment_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');
};
exports.getCurrentTimeStamp = getCurrentTimeStamp;
