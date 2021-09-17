const Animal = require("./Animal");

class Tortoise extends Animal {
    hide() {
        return "Hiding...";
    }
}

module.exports = Tortoise;