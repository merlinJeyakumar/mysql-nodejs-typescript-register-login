import {BaseResponseModel} from "../domain/model/BaseResponseModel";
import config from "../config/Configuration";
import {verify} from "../job/JwtJob";
import {Request, Response} from "express";


class PostController {
    addPost(req: Request, response: Response) {
        verify(req, response, (success, result) => {
            if (success) {
                response.json(new BaseResponseModel("authentication successful", 1, null))
            }
        })
    }
}

export = new PostController()