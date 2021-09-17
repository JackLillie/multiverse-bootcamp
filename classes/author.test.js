const Author = require("./author");

test("throw error if name is empty", () => {
    expect(() => {
        new Author("", 1990)
    }).toThrowError();
})

test("throw error if year of birth is less than 0", () => {
    expect(() => {
        new Author("Test Name", -3)
    }).toThrowError();
})

test("throw error if year of birth is not an integer", () => {
    expect(() => {
        new Author("Test Name", 8.2)
    }).toThrowError();
})

test("name argument is respected", () => {
    let testAuthor = new Author("Test Name", 2002)
    expect(testAuthor.name).toBe("Test Name");
})

test("year of birth argument is respected", () => {
    let testAuthor = new Author("Test Name", 2002)
    expect(testAuthor.yearOfBirth).toBe(2002);
})