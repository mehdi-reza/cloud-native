"use strict";
const Logger = require("./Logger");
const Utils = require("./Utils");

const log = new Logger("Cache");

module.exports = class Cache {
  constructor() {
    this.cache = [];
  }

  get(key) {
    return this.cache[key];
  }

  has(key) {
    return this.cache[key] !== undefined;
  }

  computeIfAbsent(key, mappingFunction) {
    let value = this.cache[key];
    if (value !== undefined) {
      log.debug("Cache hit");
      return Promise.resolve(value);
    }

    log.debug("Cache miss");

    let response;
    try {
      response = mappingFunction();
    } catch (err) {
      return Promise.reject(err);
    }

    if (Utils.isPromise(response)) {
      return response.then((value) => {
        this.cache[key] = value;
        return value;
      });
    }

    this.cache[key] = response;
    return Promise.resolve(response);
  }
};
