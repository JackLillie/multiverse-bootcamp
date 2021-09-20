const Post = require("./Post");

class Poll extends Post {
    constructor(title, body, options, author) {
        super(title, body, author);
        if (!Array.isArray(options)) {
            throw Error("Options must be an array");
        }
        if (options.length < 2) {
            throw Error("There must be at least 2 options");
        }
        this.options = options;
    }
}

module.exports = Poll;
