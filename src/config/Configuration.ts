import dotenv from 'dotenv'

let environment = process.env.NODE_ENV
dotenv.config({
    path: environment == 'development' || environment == undefined ? "env/development.env" : "env/production.env"
});

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;

const SERVER_HOSTNAME = process.env.SERVER_NAME;
const SERVER_PORT = process.env.PORT;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_PASS = process.env.REDIS_PASS
const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_TLS: boolean | undefined = process.env.REDIS_TLS == "true" ? true : undefined

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    secretKey: SECRET_ACCESS_KEY
}

const REDIS = {
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    pass: REDIS_PASS,
    host:REDIS_HOST,
    tls:REDIS_TLS
}

const config = {
    mysql: MYSQL,
    server: SERVER,
    redis: REDIS
}

export default config;