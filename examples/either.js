const {Either} = require("../");

// 1. Right biased either from a value showing how map works
const e1 = Either.of(1);

e1
.map(value => value+1) // terminal operation if does not return any value
.map(value => console.log("New value: ", value));

console.log("Original remains untouched: ",e1.getValue());


// 2. Right biased either from a callback showing short circuiting with swap()
const e2 = Either.from(() => "something")

e2
.map(value => value+" else before short circuit")
.map(value => {
    console.log(value);
    return value;
});

const shortCircuit=true;

e2
.swap(shortCircuit)
.map(value => console.log(value)); // this will not be executed


// 3. Left Either
const e3 = Either.left("something");
e3
.map(value => console.log(value)); // will never be executed on a left either


// 4. Right EIther
const e4 = Either.right("something");
e4
.map(value => console.log("e4 with: ", value));

// 5. flatMap
const e5 = new Either(100);
e5
.flatMap(value => value >100 ? Either.left(value): Either.right(value))
.map(value => {
    console.log("Still within the range: ",value);
    return 101;
})
.flatMap(value => value >100 ? Either.left(value): Either.right(value))
.map(value => console.log("Out of range: ", value))
.catch(value => console.log("Caught a left either: ", value));


