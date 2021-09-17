class Book {
    constructor(title, author) {
        if (title === "") {
            throw Error("Title cannot be empty");
        }
        if (typeof author !== "object") {
            throw Error("Author must be an object");
        }
        this.title = title;
        this.author = author;
        this.latestEdition = 1;
    }
    newEdition() {
        this.latestEdition += 1;
    }
}

module.exports = Book;