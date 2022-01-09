import crypto = require("crypto-js")

export const encryptStringAes = function (string: string, secret: string) {
    return crypto.AES.encrypt(string,secret)
}

export const decryptStringAes = function (aesString:string,secret:string){
    return crypto.AES.decrypt(aesString,secret).toString()
}