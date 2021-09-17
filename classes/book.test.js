const Book = require("./book");
const Author = require("./author");

let testAuthor = new Author('Test Author', 2002);

test("throw error if title is empty", () => {
    expect(() => {
        new Book("", testAuthor)
    }).toThrowError();
})

test("throw error if author is not an object", () => {
    expect(() => {
        new Book("Test Title", "Author")
    }).toThrowError();
})

test("latestEdition is 1 for a new book", () => {
    let testBook = new Book("Test Title", testAuthor)
    expect(testBook.latestEdition).toBe(1);
})

test("newEdition function increases latestEdition by 1", () => {
    let testBook = new Book("Test Title", testAuthor)
    testBook.newEdition();
    expect(testBook.latestEdition).toBe(2);
})

test("title argument is respected", () => {
    let testBook = new Book("Test Title", testAuthor)
    expect(testBook.title).toBe("Test Title");
})

test("author argument is respected", () => {
    let testBook = new Book("Test Title", testAuthor)
    expect(testBook.author).toBe(testAuthor);
})