const Comment = require("./Comment");
const User = require("./User");

const testUser = new User("Test Name");
const testComment = new Comment("Comment Text", testUser);

test("Test expected input", () => {
    expect(testComment.text).toBe("Comment Text")
});

test("throw error if text is empty", () => {
    expect(() => {
        new Comment("", testUser)
    }).toThrowError();
})

test("throw error if User not passed", () => {
    expect(() => {
        new Comment("Text", "User")
    }).toThrowError();
})
