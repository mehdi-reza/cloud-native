const { Cache } = require("../");
const { Utils } = require("../");

const R = require("ramda");

const cache = new Cache();

/**
 * Example 1
 * Tries to get value from cache for 'key1' if available, otherwise
 * get it from a 'mapping function' (returns a Promise) and return a Promise
 */
cache
  .computeIfAbsent("key1", () => {
    // here it returns a promise
    return Promise.resolve("value1");
  })
  .then((value) => console.log("Value for 'key1' is in cache now: ", value));

/**
 * Example 2
 * Tries to get value from cache for 'key2' if available, otherwise
 * get it from a 'mapping function' (returns value) and return a Promise
 */
cache
  .computeIfAbsent("key2", () => {
    // here it returns a value
    return "value2";
  })
  .then((value) => console.log("Value for 'key2' is in cache now: ", value));

/**
 * Example 3
 * When 'mapping function' need arguments (single, multiple)
 */

const mappingFunction = (input) => "Hello " + input;

cache
  .computeIfAbsent("key3", R.partial(mappingFunction, ["World"]))
  .then((value) => {
    console.log("Value for 'key3' is in cache now: ", value);
    // return key so we check it later from cache
    return "key3";
  })
  .then((key) => console.log(cache.get(key)));

/**
 * Example 4
 * When 'mapping function' throws error
 */

const whenError = (err) => console.log("mapping function threw:", err);
cache
  .computeIfAbsent("key4", () => {
    throw "It's down or timed out";
  })
  .then((rejected) => console.log(rejected))
  .catch(whenError);

/**
 * Example 5
 * When 'mapping function' is using some AWS Api
 */

const someAwsApiWhichReturnsPromise = (errorFlag) => {
  return new Promise((resolve, reject) => {
    if (errorFlag) reject("Grr");
    else resolve({ someData: "blah blah" });
  });
};

// when aws api returns data without any error
cache.computeIfAbsent("key5", () => {
  // pass errorFlag = false
  return someAwsApiWhichReturnsPromise(false).then(
    (data) => {
      console.log("Data Received: ", data);
      return data;
    },
    Utils.throwWhenError
  );
}).then(_data => console.log("Data in cache for key5: ", cache.get('key5')));

// when aws api throws error
cache.computeIfAbsent("key5", () => {
  // pass errorFlag = true
  return someAwsApiWhichReturnsPromise(true).then(
    (data) => console.log("Data Received: ", data),
    Utils.throwWhenError
  );
}).catch(error => {
  // ideally we would be using lambda callback to throw error here
  console.log("Error caught here: ", error)
});
