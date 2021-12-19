import {BaseResponseModel} from "../model/BaseResponseModel";
import jwt from "jsonwebtoken";
import config from "../config/Configuration";
import {verify} from "../job/JwtJob";
import {UserModel} from "../model/UserModel";


class PostController {

}

export = new PostController()