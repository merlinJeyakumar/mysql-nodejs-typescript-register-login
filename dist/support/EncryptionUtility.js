"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptStringAes = exports.encryptStringAes = void 0;
const crypto = require("crypto-js");
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
