import {Request, Response} from "express";
import {getRedisRefreshToken, putRedisRefreshToken} from "../job/RedisJob";


class PostController {
    async addPost(req: Request, response: Response) {
        await putRedisRefreshToken("JeyK", "MyCuteToken")
        let value: string | undefined = await getRedisRefreshToken("JeyK")
        console.log("JeyK", `value ${value}`)
        //todo: authorization
    }
}

export = new PostController()