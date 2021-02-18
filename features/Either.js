const Either = function(value, direction) {
  if (value === undefined) throw "Value cannot be undefined";

  this.value = value;
  this.direction = direction === undefined ? 1 : direction;
  this.isEither = true;

  this.isLeft = () => this.direction === 0;
  this.isRight = () => this.direction === 1;

  /**
   * Executes only if it is a Right either, will return
   * a new either with the value returned by callback.
   *
   * If callback does not return a value then it should be considered a terminal operation.
   *
   * @param {*} callback
   */
  this.map = (callback) => {
    if (this.isRight()) {
      const newValue = callback(value);
      if (newValue !== undefined) return new Either(newValue);
    } else return this;
  };

  /**
   * Executes only if it is a Right either, the callback may or may not return a value
   * but if it does then it must be an Either.Left of Either.Right
   *
   * If callback does not return a value then it should be considered a terminal operation.
   *
   * @param {*} callback
   */
  this.flatMap = (callback) => {
    if (this.isRight()) {
      const e = callback(this.value);
      if (e !== undefined)
        if (!e.isEither) throw "Returned value must be an Either";
        else return e;
    } else return this;
  };

  /**
   * Same as flatMap, instead of caller checking by if/else to return Either.Left or Either.Right,
   * just pass the flag to swap the Either
   *
   * @param {*} flag
   */
  this.swap = (flag) =>
    flag ? new Either(this.value, this.isRight() ? 0 : 1) : this;

  /**
   * Return the value in this monad
   */
  this.getValue = () => this.value;

  /**
   * Converts into a promise, .then() can be called with a callback supplied the value if it is a Right either,
   * otherwise catch block will be called.
   */
  this.toPromise = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      if (that.isRight()) resolve(that.value);
      else reject(that.value);
    });
  };

  /**
   * Will be called only if it is a Left either, it is a terminal operation.
   * @param {*} callback
   */
  this.catch = (callback) => {
    if (this.isLeft()) {
      callback(this.value);
    }
  };
}

/**
 * Create a Right either with a value
 * @param {*} value 
 */
Either.of = value => {
    return new Either(value);
}

/**
 * Creates a Left either 
 * @param {*} value 
 */
Either.left = value => {
    return new Either(value, 0)
}

/**
 * Alias of `new Either()`
 * @param {*} value 
 */
Either.right = value => {
    return new Either(value)
}

/**
 * Creates a Right either by executing the provided callback
 * @param {*} callback 
 */
Either.from = callback => {
    return new Either(callback())
}

module.exports = Either;