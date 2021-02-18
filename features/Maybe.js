const Either = require("./Either")

class Maybe {

    constructor(value) {
        this.value = value;
        this.isMaybe = true;
    }

    isEmpty() {
        return this.value==null || this.value==undefined;
    }

    map(callback) {
        if(this.isEmpty()) return this;
        return new Maybe(callback(this.value));
    }

    flatMap(callback) {
        if(this.isEmpty()) return this;
        const result = callback(this.value);
        if(!result.isMaybe) throw "Returned value must be an instance of Maybe";
        return new Maybe(result.getValue());
    }

    getValue() {
        return this.isEmpty() ? Maybe.NOTHING : this.value;
    }

    ifEmpty(callback) {
        if(this.isEmpty()) callback();
    }

    /**
     * Returns a Left either if empty, otherwise Right
     */
    toEither() {
        return this.isEmpty() ? Either.left("<empty>") : Either.right(this.value)
    }
}

Maybe.NOTHING = "<nothing>"

module.exports = Maybe