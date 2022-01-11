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
const EncryptionUtility_1 = require("../support/EncryptionUtility");
/* https://github.com/brix/crypto-js/issues/271 */
class PostController {
    addPost(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedText = (0, EncryptionUtility_1.encryptStringAes)("bujji harshi", "harshi");
            console.log("JeyK: encryptedText: ", encryptedText);
            const decryptedText = (0, EncryptionUtility_1.decryptStringAes)(encryptedText, "harshi");
            console.log("JeyK: decryptedText: ", decryptedText);
            //await putRedisRefreshToken("JeyK", "MyCuteToken")
            //let value: string | undefined = await getRedisRefreshToken("JeyK")
            //console.log("JeyK", `value ${value}`)
            response.json("{}");
            //todo: authorization
        });
    }
}
module.exports = new PostController();
