describe("Cache", function() {

    const { Cache } = require("../")
    const cache=new Cache()

    it("should take value for a key and return the cached value", function() {
        cache.computeIfAbsent("key1", () => "value1");
        expect(cache.get("key1")).toBe("value1")
    })

    it("should take value for a key from a promise and return the cached value", function() {
        cache.computeIfAbsent("key1", () => {
            return new Promise((resolve, _reject) => {
                resolve("value1");
            })
        }).then(_ => {
            expect(cache.get("key1")).toBe("value1")
        })        
    })

    it("should report 'has the value' for a key", function() {
        cache.computeIfAbsent("key1", () => "value1");
        expect(cache.has("key1")).toBeTruthy();

        cache.computeIfAbsent("key2", () => {
            return new Promise((resolve, _reject) => {
                resolve("value2");
            })
        }).then(_ => {
            expect(cache.has("key2")).toBeTruthy()
        })  
    })
})