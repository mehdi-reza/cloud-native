const lambda = require("../aws/framework/lambda");
const Service1 = require("./service1");

/**
 *                 API Service Flow
 *              =====================
 *   /-------------------------------------------\
 *   | lambda -> business service -> aws service |
 *   \-------------------------------------------/
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
exports.handler = lambda("lambda-name", (event, context, callback, sdk, cache) => {
  const logger = sdk.logger(module);
  //https://joi.dev/api/?v=17.3.0


  // valiations here
  // if any error, then return callback with error

  // else


  logger.info("lambda invoked")
  
  new Service1(sdk, cache)
    .find()
    .then((response) => {
      // final transformation for http response
      callback(null, response);
    })
    .catch((err) => {
      logger.error("Error logged in cloudwatch:", err);
      callback(err);
    });
});

// make few lambda calls
for (var i = 0; i < 1; i++) {
  this.handler({}, {}, (e, response) => {
    if (e) console.log("Error:", e);
    else console.log("Response:", response);
  });
}
