const LEVELS = ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"];
const nameWidth = 30
const _name = name => {
    return name.length < nameWidth ? name+(" ".repeat(30-name.length)) : name.length > nameWidth ? name.substring(name.length-nameWidth) : name;
}


class Logger {

    constructor(name, level = "INFO") {
        this.name = _name(name);
        this.level = LEVELS.indexOf(level.toUpperCase());
        if(this.level==-1) throw ("Invalid log level specified: "+level)
    }

    isDebugEnabled() {
        return this.level >= 4;
    }

    isTraceEnabled() {
        return this.level == 5;
    }

    getLevel() {
        return LEVELS[this.level];
    }

    setLevel(level) {
        this.level = LEVELS.indexOf(level.toUpperCase());
            if(this.level==-1) throw ("Invalid log level specified: "+level)
    }

    fatal() {
        console.log(this.name,"[FATAL]",...arguments);
    }

    error() {
        if(this.level >= 1)
            console.log(this.name,"[ERROR]",...arguments);
    }

    warn() {
        if(this.level >= 2)
            console.log(this.name,"[WARN ]",...arguments);
    }

    info() {
        if(this.level >= 3)
            console.log(this.name,"[INFO ]",...arguments);
    }

    debug() {
        if(this.level >= 4)
            console.log(this.name,"[DEBUG]",...arguments);
    }

    trace() {
        if(this.level >= 5)
            console.log(this.name,"[TRACE]",...arguments);
    }

    logWhenTrace() {
        if(this.isTraceEnabled()) {
            this.trace(JSON.stringify({...arguments}));
        }
    }
}

module.exports = Logger