import crypto = require("crypto-js")

const bcrypt = require('bcrypt');

let initializationVector = '#@R$#IIMAM$3^O!N@^5#U';

export const encryptStringAes = function (string: string, secret: string) {
    let encJson = crypto.AES.encrypt(JSON.stringify(string), secret).toString()
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(encJson))
}

export const decryptStringAes = function (aesString: string, secret: string) {
    let decData = crypto.enc.Base64.parse(aesString).toString(crypto.enc.Utf8)
    return JSON.parse(crypto.AES.decrypt(decData, secret).toString(crypto.enc.Utf8))
}

export const getPasswordHash = async function (plainPassword: string) {
    return await bcrypt.hash(plainPassword, 10).catch((reason: any) => {
        console.log("JeyK: ", reason)
    });
}

export const compareHashPassword = async function (plainPassword: string, hash: string) {
    return await bcrypt.compare(plainPassword, hash).catch((reason: any) => {
        console.log("JeyK: ", reason)
    })
}