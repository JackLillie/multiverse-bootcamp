const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

const testUser = new User("Test Name");
const testPost = new Post("Title", "Body", testUser);
const testComment = new Comment("Comment", testUser);

test("Test expected input", () => {
    expect(testPost.title).toBe("Title")
});

test("throw error if title is empty", () => {
    expect(() => {
        new Post("", "Body", testUser)
    }).toThrowError();
})

test("throw error if body is empty", () => {
    expect(() => {
        new Post("Title", "", testUser)
    }).toThrowError();
})

test("throw error if User not passed", () => {
    expect(() => {
        new Post("Title", "Body", "User")
    }).toThrowError();
})

test("addComment function works", () => {
    testPost.addComment(testComment, testUser)
    expect(testPost.comments.length).toBeGreaterThan(0)
});

test("deleteComment function works", () => {
    testPost.deleteComment(testComment)
    expect(testPost).not.toContain(testComment)
});

test("deleteComment throws error when comment instance not passed", () => {
    expect(() => {
        testPost.deleteComment("")
    }).toThrowError();
})

test("addComment throws error when Comment not passed", () => {
    expect(() => {
        testPost.addComment("")
    }).toThrowError();
})