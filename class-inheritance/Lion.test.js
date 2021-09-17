const Lion = require("./Lion");

test("roar function works", () => {
    let testLion = new Lion("Leo", 10, 4)
    expect(testLion.roar()).toBe("ROAR");
})