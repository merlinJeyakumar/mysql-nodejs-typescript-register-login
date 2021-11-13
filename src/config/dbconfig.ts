import config from "./configuration";

const params = {
    user: config.mysql.user,
    pass: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
};

export default params;