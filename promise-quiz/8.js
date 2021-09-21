const { readFile } = require("fs/promises");

async function readAndPrint() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    console.log(response);
    console.log("hello");
}

readAndPrint();
console.log("goodbye");
// Will print "goodbye", then "hello", then "fox"
// Incorrect, "fox" is printed before "hello" since the file read is being awaited and the console.log("hello") is also inside the same function.