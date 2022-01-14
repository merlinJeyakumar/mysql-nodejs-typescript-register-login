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
const RedisJob_1 = require("../job/RedisJob");
class PostController {
    addPost(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, RedisJob_1.putRedisRefreshToken)("JeyK", "MyCuteToken");
            let value = yield (0, RedisJob_1.getRedisRefreshToken)("JeyK");
            console.log("JeyK", `value ${value}`);
            //todo: authorization
        });
    }
}
module.exports = new PostController();
