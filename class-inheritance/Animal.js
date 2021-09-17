class Animal {
    constructor (name, age, numberOfLegs) {
        if (name === "") {
            throw Error("Name must not be blank");
        }
        if (typeof age !== "number" || age < 0) {
            throw Error("Age must be a number greater than 0")
        }
        if (typeof numberOfLegs !== "number" || numberOfLegs <= 0) {
            throw Error("Number of legs must be a number greater than or equal to 0")
        }
        this.name = name;
        this.age = age;
        this.numberOfLegs = numberOfLegs;
    }
    birthday() {
        this.age += 1;
    }
}

module.exports = Animal;