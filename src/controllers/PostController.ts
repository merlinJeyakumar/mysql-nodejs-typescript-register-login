import {Request, Response} from "express";
import {compareHashPassword, decryptStringAes, encryptStringAes, getPasswordHash} from "../support/EncryptionUtility";

/* https://github.com/brix/crypto-js/issues/271 */
class PostController {
    async addPost(req: Request, response: Response) { //todo: rewrite with source
        const encryptedText = encryptStringAes("bujji harshi", "harshi");
        console.log("JeyK: encryptedText: ", encryptedText)

         const decryptedText = decryptStringAes(encryptedText, "harshi");
         console.log("JeyK: decryptedText: ", decryptedText)

        let plain = await getPasswordHash("Merlin")
        console.log("Compare: ", await compareHashPassword("Merlin", plain))
        //await putRedisRefreshToken("JeyK", "MyCuteToken")
        //let value: string | undefined = await getRedisRefreshToken("JeyK")
        //console.log("JeyK", `value ${value}`)
        response.json("{}")
        //todo: authorization
    }
}

export = new PostController()