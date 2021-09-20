const Post = require("./Post");

class User {
    constructor(name) {
        if (name === "") {
            throw Error("Name must not be empty");
        }
        if (!(name[0].toLowerCase() != name[0].toUpperCase())) {
            throw Error("Name must not start with a number");
        }
        this.name = name;
        this.posts = [];
    }
    changeName(name) {
        if (name === "") {
            throw Error("Name must not be empty");
        }
        if (!(name[0].toLowerCase() != name[0].toUpperCase())) {
            throw Error("Name must not start with a number");
        }
        this.name = name;
    }
    addPost(post) {
        if (!(post instanceof Post)) {
            throw Error("You must pass a Post instance");
        }
        this.posts.push(post);
    }
}

module.exports = User;