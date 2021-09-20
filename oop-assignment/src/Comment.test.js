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

test("reply with expected input", () => {
    testComment.reply(new Comment("Comment Reply", testUser))
    expect(testComment.replies.length).toBeGreaterThan(0)
});

test("delete function works", () => {
    testComment.delete()
    expect(typeof testComment).toBe("undefined")
});

test("reply throws error when Comment not passed", () => {
    expect(() => {
        testComment.reply("")
    }).toThrowError();
})