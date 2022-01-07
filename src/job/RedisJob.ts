import * as redis from 'redis';
import config from "../config/Configuration";

const redisClient = redis.createClient({
    password:config.redis.pass
});
redisClient.connect()

export const getRefreshToken = (userId: string) => {
    return redisClient.HGET(userId, "refresh");
}
export const getAccessToken =  (userId: string) => redisClient.HGET(userId, "access")
export const putAccessToken =  (userId: string, value: string) => redisClient.HSET(userId, "access", value)
export const putRefreshToken =  (userId: string, value: string) => redisClient.HSET(userId, "refresh", value)