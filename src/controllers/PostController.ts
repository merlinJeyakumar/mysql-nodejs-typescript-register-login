import {BaseResponseModel} from "../domain/model/BaseResponseModel";
import {verify} from "../job/JwtJob";
import {Request, Response} from "express";
import {getRefreshToken, putRefreshToken} from "../job/RedisJob";


class PostController {
    async addPost(req: Request, response: Response) {
        await putRefreshToken("JeyK", "MyCuteToken").catch(reason => {
            console.log(`JeyK: #Error ${reason}`)
        })
        let value: string | unknown = await getRefreshToken("JeyK").catch(reason => {
            console.log("JeyK: Error")
        })
        console.log("JeyK", `value ${value}`)
        verify(req, response, (success, result) => {
            if (success) {
                response.json(new BaseResponseModel("authentication successful", 1, null))
            }
        })
    }
}

export = new PostController()