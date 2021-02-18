describe("Lambda", function() {

    // On lambda handlers
    // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html

    const lambda = require("../aws/framework/lambda")
    
    it("provides sync lambda handler", function() {

        const _response = "success";
        const _event = "event";
        const _context = "context";
        const _error = "error";

        const handler = lambda("sync-lambda", (event, context, callback, sdk, cache) => {
            expect(event).toBe(_event);
            expect(context).toBe(_context);
            callback(_error, _response)

            expect(sdk).not.toBeNull()
            expect(cache).not.toBeNull()
        })

        handler(_event, _context, (err, response) => {
            expect(response).toBe(_response);
            expect(err).toBe(_error);
        })
    })

    it("provides async lambda handler", function() {

        const _response = "success";
        const _event = "event";
        const _context = "context";
        const _error = "error";

        const handler = lambda.async("async-lambda", (event, context, sdk, cache) => {
            expect(event).toBe(_event);
            expect(context).toBe(_context);

            expect(sdk).not.toBeNull()
            expect(cache).not.toBeNull()

            return Promise.resolve("OK")
        })

        handler(_event, _context, (err, response) => {
            expect(response).toBe(_response);
            expect(err).toBe(_error);
        }).then(response => {
            expect(response).toBe("OK")
        })
    })

    it("provides async lambda handler and handles rejected promise ", function() {

        const _response = "success";
        const _event = "event";
        const _context = "context";
        const _error = "error";

        const handler = lambda.async("async-lambda", (event, context, sdk, cache) => {
            expect(event).toBe(_event);
            expect(context).toBe(_context);

            expect(sdk).not.toBeNull()
            expect(cache).not.toBeNull()

            return Promise.reject("ERROR")
        })

        handler(_event, _context, (err, response) => {
            expect(response).toBe(_response);
            expect(err).toBe(_error);
        }).catch(error => {
            expect(error).toBe("ERROR")
        })
    })

    it("provides async lambda handler and handles thrown error", function() {

        const _response = "success";
        const _event = "event";
        const _context = "context";
        const _error = "error";

        const handler = lambda.async("async-lambda", (event, context, sdk, cache) => {
            expect(event).toBe(_event);
            expect(context).toBe(_context);

            expect(sdk).not.toBeNull()
            expect(cache).not.toBeNull()

            throw "ERROR"
        })

        handler(_event, _context, (err, response) => {
            expect(response).toBe(_response);
            expect(err).toBe(_error);
        }).catch(error => {
            expect(error).toBe("ERROR")
        })
    })
})