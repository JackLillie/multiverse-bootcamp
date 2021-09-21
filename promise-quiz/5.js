const { readFile } = require("fs/promises");

async function readAnimal() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    return response;
}

const mvResponse = readAnimal();
console.log(mvResponse);

// Prints "fox"
// Incorrect, returns a pending promise.