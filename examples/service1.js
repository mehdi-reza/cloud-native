const { Utils } = require("..");

module.exports = class {
  constructor(sdk, lambdaCache) {
    this.sdk = sdk;
    this.lambdaCache = lambdaCache;
    this.logger = this.sdk.logger(module);
    this.logger.debug("service1 intialized");
  }

  async find() {
    this.logger.info("Entered Service1.find()");

    /* 
    1. using callback
    -----------------
    */
    return this.sdk.require(["S3", "SQS"], (s3, sqs) => {
      this.logger.debug(s3, sqs);
      // 1. calling s3
      s3.putObject({})
        .promise()
        .then((response) => {
          // do something with response (if required)
          // do something with 'response_from_s3', may be call another aws service
          // which is required in aws.require()
          // or return
          // return response_from_s3;

          return response;
        }, Utils.throwWhenError);
    });

    /*
    2. using promise
    ----------------
    return this.sdk.require(["s3","db"])
    .then(services => {
      const [s3, db] = services
      return s3.putObject().promise();
    })
    */

    /*
    3. providing service extension
    
    const rdsPoolCreator = function (options) {
      console.log("Creating new RDS Pool with options: ", options);
    };

    this.sdk
      .require(["RDSPOOL"], null, {
        RDSPOOL: rdsPoolCreator,
      })
      .then((services) => {
        const [rdspool] = services;
        console.log(rdspool);
      });
      */
  }
};
