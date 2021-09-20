const Post = require("./Post");

class User {
    constructor(name, isAdmin=false) {
        if (name === "") {
            throw Error("Name must not be empty");
        }
        if (!(name[0].toLowerCase() != name[0].toUpperCase())) {
            throw Error("Name must not start with a number");
        }
        this.name = name;
        this.posts = [];
        this.isAdmin = isAdmin;
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
}

module.exports = User;