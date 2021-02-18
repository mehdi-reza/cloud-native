exports.isPromise = (value) => !!value && typeof value.then === "function";

/**
 * Utility function to throw error when called
 * @param {*} error
 * @param {*} data
 */
exports.throwWhenError = (error) => {
  // it should always be called when there is an error
  // still we have put a check
  if (error)
    if (error.code) throw error.code;
    else throw error;
};

exports.noop = function () {};

exports.suppressCallback = function (f, args) {
  let result, _args;
  _args = args || [];
  //pushing dummy callback
  _args.push(function () {
    result = arguments;
  });
  f(..._args);
  return result;
};

exports.createError = function (message) {
  const error = new Error(message);
  return {
    error,
    code: function (_code) {
      error.code = _code;
      return error;
    },
  };
};

exports.throwWhen = (flag, message, code) => {
  if (flag) {
    const e = new Error(message);
    if (code) e.code = code;
    throw e;
  }
};
