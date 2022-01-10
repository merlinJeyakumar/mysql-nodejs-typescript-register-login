import crypto = require("crypto-js")

export const encryptStringAes = function (string: string, secret: string) {
    return crypto.AES.encrypt(string,secret).toString()
}

export const decryptStringAes = function (aesString:string,secret:string){
    return crypto.AES.decrypt(aesString,secret).toString(CryptoJS.enc.Utf8)
}