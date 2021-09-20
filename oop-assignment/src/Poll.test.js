const Poll = require("./Poll");
const User = require("./User");


const testUser = new User("Test Name");


test("throws error when array not passed as options", () => {
    expect(() => {
        new Poll("Test Poll", "Do you like gaming?", "yes/no", testUser)
    }).toThrowError();
});

test("throws error when options array length is less than 2", () => {
    expect(() => {
        new Poll("Test Poll", "Do you like gaming?", ["Yes"], testUser)
    }).toThrowError();
});