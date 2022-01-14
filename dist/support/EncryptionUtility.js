"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashPassword = exports.getPasswordHash = exports.decryptStringAes = exports.encryptStringAes = void 0;
const crypto = require("crypto-js");
const bcrypt = require('bcrypt');
let initializationVector = '#@R$#IIMAM$3^O!N@^5#U';
const encryptStringAes = function (string, secret) {
    let encJson = crypto.AES.encrypt(JSON.stringify(string), secret).toString();
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(encJson));
};
exports.encryptStringAes = encryptStringAes;
const decryptStringAes = function (aesString, secret) {
    let decData = crypto.enc.Base64.parse(aesString).toString(crypto.enc.Utf8);
    return JSON.parse(crypto.AES.decrypt(decData, secret).toString(crypto.enc.Utf8));
};
exports.decryptStringAes = decryptStringAes;
const getPasswordHash = function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.hash(plainPassword, 10).catch((reason) => {
            console.log("JeyK: ", reason);
        });
    });
};
exports.getPasswordHash = getPasswordHash;
const compareHashPassword = function (plainPassword, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(plainPassword, hash).catch((reason) => {
            console.log("JeyK: ", reason);
        });
    });
};
exports.compareHashPassword = compareHashPassword;
