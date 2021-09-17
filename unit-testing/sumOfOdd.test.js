const sumOfOdd = require("./sumOfOdd");

test("normal input", () => {
    expect(sumOfOdd([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5)
});

test("empty array", () => {
    expect(sumOfOdd([])).toBe(0)
});

test("all negative numbers", () => {
    expect(sumOfOdd([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10])).toBe(5)
});

test("some positive some negative", () => {
    expect(sumOfOdd([1, -2, -3, 4, -5, -6, 7, 8, -9, 10])).toBe(5)
});