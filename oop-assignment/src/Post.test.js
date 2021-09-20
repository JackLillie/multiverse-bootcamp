const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

const testUser = new User("Test Name");
const testPost = new Post("Title", "Body", testUser);

test("Test expected input", () => {
    expect(testPost.name).toBe("Title")
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

test("addComment with expected input", () => {
    testPost.addComment(new Comment("Comment", testUser))
    expect(testPost.comments.length).toBeGreaterThan(0)
});

test("delete function works", () => {
    testPost.delete()
    expect(typeof testPost).toBe("undefined")
});

test("addComment throws error when Comment not passed", () => {
    expect(() => {
        testPost.addComment("")
    }).toThrowError();
})