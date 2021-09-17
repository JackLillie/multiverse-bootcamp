const Tortoise = require("./Tortoise");

test("hide function works", () => {
    let testTortoise = new Tortoise("Terry", 56, 4)
    expect(testTortoise.hide()).toBe("Hiding...");
})