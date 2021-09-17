const Animal = require("./Animal");

let testAnimal = new Animal("Name", 15, 4)

test("Name argument is respected", () => {
    expect(testAnimal.name).toBe("Name");
})

test("Age argument is respected", () => {
    expect(testAnimal.age).toBe(15);
})

test("numberOfLegs argument is respected", () => {
    expect(testAnimal.numberOfLegs).toBe(4);
})

test("Throw an error if name is empty", () => {
    expect(() => {
        new Animal("", 15, 4)
    }).toThrowError();
})

test("Throw an error if age is not a number", () => {
    expect(() => {
        new Animal("", "15", 4)
    }).toThrowError();
})

test("Throw an error if age is less than 0", () => {
    expect(() => {
        new Animal("", -2, 4)
    }).toThrowError();
})

test("Throw an error if numberOfLegs is not a number", () => {
    expect(() => {
        new Animal("", 15, "4")
    }).toThrowError();
})

test("Throw an error if numberOfLegs is less than 0", () => {
    expect(() => {
        new Animal("", 15, -4)
    }).toThrowError();
})

test("Birthday function works", () => {
    testAnimal.birthday();
    expect(testAnimal.age).toBe(16);
})
