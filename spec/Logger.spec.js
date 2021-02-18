const { Logger } = require("../");

const logger=new Logger("logger-name"); // default level is INFO

describe("Logger", function () {

    it("should always log fatal level", function () {
        spyOn(console, "log")
        logger.fatal("This is fatal")
        expect(console.log).toHaveBeenCalled();
    });

    it("should log at error level", function () {
        spyOn(console, "log")
        logger.error("This is error")
        expect(console.log).toHaveBeenCalled();
    });

    it("should skip error logging at fatal level", function () {
        spyOn(console, "log")
        const _logger=new Logger("test","FATAL")
        _logger.error("This is error")
        expect(console.log).not.toHaveBeenCalled();
    });

    it("should log at warn level", function () {
        spyOn(console, "log")
        logger.warn("This is warn")
        expect(console.log).toHaveBeenCalled();
    });

    it("should log at info level", function () {
        spyOn(console, "log")
        logger.info("This is info")
        expect(console.log).toHaveBeenCalled();
    });

    it("should skip info logging at error level", function () {
        spyOn(console, "log")
        const _logger=new Logger("test","ERROR")
        _logger.info("This is debug")
        expect(console.log).not.toHaveBeenCalled();
    });

    it("should skip debug logging at info level", function () {
        spyOn(console, "log")
        logger.debug("This is debug")
        expect(console.log).not.toHaveBeenCalled();
    });

    it("should log at debug level", function () {
        spyOn(console, "log")
        const _logger=new Logger("test","DEBUG")
        _logger.debug("This is debug")
        expect(console.log).toHaveBeenCalled();
    });

    it("should not log at trace level", function () {
        spyOn(console, "log")
        logger.trace("This is trace")
        expect(console.log).not.toHaveBeenCalled();
    });

    it("should log at trace level", function () {
        spyOn(console, "log")
        const _logger=new Logger("test","TRACE")
        _logger.trace("This is debug")
        expect(console.log).toHaveBeenCalled();
    });
});
