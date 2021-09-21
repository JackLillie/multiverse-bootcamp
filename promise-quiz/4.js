const { readFile } = require("fs/promises");

async function readAndPrint() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    console.log(response);
}

console.log("hello");
readAndPrint();
console.log("goodbye");

// Prints "hello", then "goodbye", then "fox" since it is similar to the last one, but this one is an async function instead.
// Correct