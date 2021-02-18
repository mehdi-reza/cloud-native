const aop = require("../features/Aop.js")

// before, original and after
// while before performs normally
aop.around(() => {
    console.log("****** Before is called")
}, input => {
    console.log("Original is called", input.args)
}, () => {
    console.log("------ After is called")
})({id: 1})

console.log("\n-------------------------\n")

// before throws exception
aop.around(() => {
    throw "Before threw exception"
}, input => {
    console.log("Original is called", input.args, input.error, input.error.phase)
}, () => {
    // this is not called if before throws any exception
    console.log("------ After is called")
})({id: 2})

console.log("\n-------------------------\n")

// before and after is optional
aop.around(null, input => {
    console.log("Original is called", input.args)
}, null)({id: 3})