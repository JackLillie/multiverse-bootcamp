const { readFile } = require("fs/promises");
console.log(readFile("./animal.txt"));
// Pending promise since we didn't use an async await function or "then" function.
// Correct