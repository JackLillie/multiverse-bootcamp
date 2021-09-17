const Animal = require("./Animal");

class Lion extends Animal{
    roar() {
        return "ROAR";
    }
}

module.exports = Lion;