const { readFile } = require("fs/promises");

console.log("hello");
readFile("./animal.txt", { encoding: "utf-8" }).then(console.log);
console.log("goodbye");

// Prints, "hello", then "goodbye", then "fox" since the async function will wait until the call stack is empty until it runs the callback.
// Correct