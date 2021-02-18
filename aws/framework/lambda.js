const Cache = require("../../features/Cache");
const SDK = require("./sdk")
const uuidv4 = require("uuid/v4")
const SSM = require("aws-sdk/clients/ssm");
/*
const awsConfig = Promise.resolve({
    maxRetries: 3,
    region: "us-east-1",
    logLevel: "INFO",
    iotEndpoint: "a1t81xj2jm3mst.iot.us-east-1.amazonaws.com",
    webCenterSecretID: "Secret-xell-sbi-RC",
    secretEndpoint: "https://secretsmanager.us-east-1.amazonaws.com",
}); //cache.computeIfAbsent("aws-config", () =>new SSM().getParameter({Name: "aws-config", WithDecryption: true}).promise());
*/

const lambdaId = uuidv4();
const startedAt = new Date();
const cache=new Cache();
const identity = input => input;

var logger;
process.on('beforeExit', function() {
    logger.info(`${lambdaId} - died in: `, (new Date().getTime() - startedAt.getTime())/1000, "seconds")
})

const lambda = function(lambda, callback, env = "default", configInterceptor = identity) {
    const awsConfig = new SSM().getParameter({Name: env, WithDecryption: true}).promise();
    const sdk = new SDK(awsConfig.then(configInterceptor));

    logger=sdk.logger("aws/framework/lambda.js");
    logger.info(`${lambdaId} - sync λ warming up`)

    return function(event, context, _callback) {
        logger.info("Start request: ", lambda);
        callback(event, context, (err, response) => {
            _callback(err, response);
            logger.info("End request: ", lambda);
        }, sdk, cache);
    }
}

lambda.async = function(lambda, callback, env = "default", configInterceptor = identity) {
    const awsConfig = new SSM().getParameter({Name: env, WithDecryption: true}).promise();
    const sdk = new SDK(awsConfig.then(configInterceptor));

    logger=sdk.logger("aws/framework/lambda.js");
    logger.info(`${lambdaId} -  async λ warming up`)

    return async function(event, context) {
        logger.info("Start request: ", lambda);
        const response = callback(event, context, sdk, cache);
        logger.info("End request: ", lambda);
        return response;
    }
}

module.exports = lambda;
