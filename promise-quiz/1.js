const { readFile } = require("fs/promises");

readFile("./animal.txt", { encoding: "utf-8" }).then(console.log);
// Error
// There is no callback and the console.log has no brackets at the end
// Incorrect: prints fox, after research I found out that a "console.log" with no brackets implicitly passes the result of the promise.