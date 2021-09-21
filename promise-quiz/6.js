const { readFile } = require("fs/promises");

async function readAnimal() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    return response;
}

readAnimal().then(console.log);
// Will print "fox" since the "then" function will return the unwrapped Promise.
// Correct