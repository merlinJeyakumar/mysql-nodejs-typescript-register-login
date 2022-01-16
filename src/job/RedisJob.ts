import * as redis from 'redis';
import config from "../config/Configuration";

const redisClient = redis.createClient({
    username: config.redis.username,
    password:config.redis.pass,
    socket:{
        port : config.redis.port,
        host : config.redis.host,
        tls : config.redis.tls
    }
});

redisClient.connect().catch(reason => {
    console.log(`RedisError: ${reason}`)
})

export const getRedisRefreshToken = async (userId: string) => {
    return await redisClient.HGET(userId, "refresh").catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}
export const getRedisAccessToken = (userId: string) => {
    return redisClient.HGET(userId, "access").catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}
export const putRedisAccessToken = (userId: string, value: string) => {
    return redisClient.HSET(userId, "access", value).catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}
export const putRedisRefreshToken = (userId: string, value: string) => {
    return redisClient.HSET(userId, "refresh", value).catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}

export const clearRedisKey = function (key: string) {
    return redisClient.del(key)
}