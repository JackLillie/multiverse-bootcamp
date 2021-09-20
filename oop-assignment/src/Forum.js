const Category = require("./Category");
const User = require("./User");

class Forum {
    constructor(name) {
        if (name === "") {
            throw Error("Name must not be empty");
        }
        this.name = name;
        this.categories = [];
        this.users = [];
    }
    addCategory(category) {
        let newCategory = new Category(category);
        this.categories.push(newCategory);
        return newCategory;
    }
    deleteCategory(category) {
        if (!(category instanceof Category)) {
            throw Error("Please pass a Category instance");
        }
        let filtered = this.categories.filter(function (el) { return el.name != category.name; });
        this.categories = filtered;
    }
    addUser(name) {
        let newUser = new User(name);
        this.users.push(newUser);
        return newUser;
    }
    deleteUser(user) {
        if (!(user instanceof User)) {
            throw Error("Please pass a User instance");
        }
        let filtered = this.users.filter(function (el) { return el.name != user.name; });
        this.users = filtered;
    }
}

module.exports = Forum;