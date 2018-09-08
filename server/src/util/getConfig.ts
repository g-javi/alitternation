

const environment = process.env.NODE_ENV || "development";

const config = require(`${__dirname}/../../config/${environment}.json`);

const getConfig = () => {
    return config;
}

export default getConfig;
