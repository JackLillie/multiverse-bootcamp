const User = require("./User");
const Comment = require("./Comment");

class Post {
    constructor(title, body, author) {
        if (title === "") {
            throw Error("Title must not be empty");
        }
        if (body === "") {
            throw Error("Body must not be empty");
        }
        if (!(author instanceof User)) {
            throw Error("You must pass a User instance");
        }
        this.title = title;
        this.body = body;
        this.author = author;
        this.date = new Date();
        this.comments = [];
    }
    addComment(comment, author) {
        let newComment = new Comment(comment, author);
        this.comments.push(newComment);
        return newComment;
    }
    deleteComment(comment) {
        if (!(comment instanceof Comment)) {
            throw Error("Please pass a Comment instance");
        }
        let filtered = this.comments.filter(function (el) { return el.text != comment.text; });
        this.comments = filtered;
    }
}

module.exports = Post;