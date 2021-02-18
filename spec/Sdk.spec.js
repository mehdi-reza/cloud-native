const Sdk = require("../aws/framework/sdk")

describe("Sdk", function() {
    
    beforeEach(function() {

        const logLevel = "DEBUG";
        const region = "test-region";
        const maxRetries = 5;
        const connectTimeout = 2000;
        const timeout = 2000;
        const iotEndpoint = "a1t81xj2jm3mst.iot.us-east-1.amazonaws.com";

        this.sdkOptions = Promise.resolve({
            maxRetries,
            httpOptions: {
                connectTimeout,
                timeout
            },
            region,
            logLevel,
            enableSdkLogging: true,
            iotEndpoint
        })
    })

    it("should use provided options", async function() {

        const sdkOptions = await this.sdkOptions
        const sdk = new Sdk(this.sdkOptions)
        // initially it sets to INFO until the options promise is resolved
        setTimeout(() => {
            expect(sdk.logger("check").getLevel()).toBe(sdkOptions.logLevel)
        },1000);

        const configMatcher = db => {
            expect(db.service.config.region).toBe(sdkOptions.region)
            expect(db.service.config.maxRetries).toBe(sdkOptions.maxRetries)
            expect(db.service.config.httpOptions.connectTimeout).toBe(sdkOptions.httpOptions.connectTimeout)
            expect(db.service.config.httpOptions.timeout).toBe(sdkOptions.httpOptions.timeout)
            expect(db.service.config.logger).not.toBeNull()
        }

        // works by returning promise
        sdk.require(["DB"])
        .then(services => {
            const [db] = services;
            configMatcher(db);
        })

        // works with callback
        sdk.require(["DB"], (db) => {
            configMatcher(db)
        })
    })

    it("should use provided options when creating services instance", async function() {

        const sdkOptions = await this.sdkOptions
        const sdk = new Sdk(this.sdkOptions)

        sdk.require(["IOTDATA"])
        .then(services => {
            const [iotData] = services;
            expect(iotData.endpoint.hostname).toBe(sdkOptions.iotEndpoint)
        })
    })
})