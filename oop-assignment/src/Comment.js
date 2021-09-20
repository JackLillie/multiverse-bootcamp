const User = require("./User");

class Comment {
    constructor(text, author) {
        if (text === "") {
            throw Error("Text must not be empty")
        }
        if (typeof author === "undefined") {
            throw Error("You must pass an author argument")
        }
        if (!(author instanceof User)) {
            throw Error("You must pass a User instance");
        }
        this.text = text;
        this.author = author;
        this.date = new Date();
    }
}

module.exports = Comment;