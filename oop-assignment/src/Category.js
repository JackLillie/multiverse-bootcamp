const Poll = require("./Poll");
const Post = require("./Post");

class Category {
    constructor(name) {
        if (name === "") {
            throw Error("Name must not be empty");
        }
        this.name = name;
        this.posts = [];
    }
    addPost(title, body, author) {
        let newPost = new Post(title, body, author)
        author.posts.push(title);
        this.posts.push(newPost);
        return newPost;
    }
    addPoll(title, body, options, author) {
        let newPoll = new Poll(title, body, options, author);
        author.posts.push(title);
        this.posts.push(newPoll);
        return newPoll;
    }
    deletePost(post) {
        if (!(post instanceof Post)) {
            throw Error("Please pass a Post instance");
        }
        let filtered = this.posts.filter(function (el) { return el.title != post.title; });
        this.posts = filtered;
    }
}

module.exports = Category;