const Category = require("./Category");
const Forum = require("./Forum");
const Post = require("./Post");
const User = require("./User");

const testCategory = new Category("Test Category");
const testUser = new User("Test Name");
const testPost = new Post("Title", "Body", testUser);

test("Test expected input", () => {
    expect(testCategory.name).toBe("Test Category")
});

test("throw error if name is empty", () => {
    expect(() => {
        new Category("")
    }).toThrowError();
})


test("addPost with expected input", () => {
    testCategory.addPost("Test title", "Test body", testUser)
    expect(testCategory.posts.length).toBeGreaterThan(0)
});

test("addPost should throw error if a Post isn't passed", () => {
    expect(() => {
        testCategory.addPost("")
    }).toThrowError();
});

test("deletePost function throws error when post instance not passed", () => {
    expect(() => {
        testCategory.deletePost("")
    }).toThrowError();
});

test("deletePost function works", () => {
    testCategory.deletePost(testPost)
    expect(testCategory).not.toContain(testPost)
});