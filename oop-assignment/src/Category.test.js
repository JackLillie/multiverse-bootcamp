const Category = require("./Category");
const Post = require("./Post");
const User = require("./User");

const testCategory = new Category("Test Category");

test("Test expected input", () => {
    expect(testCategory.name).toBe("Test Category")
});

test("throw error if name is empty", () => {
    expect(() => {
        new Category("")
    }).toThrowError();
})

test("throw error if name starts with a number", () => {
    expect(() => {
        new Category("1Category")
    }).toThrowError();
})

test("addPost with expected input", () => {
    testCategory.addPost(new Post("Title", "Body", new User("Test Name")))
    expect(testCategory.posts.length).toBeGreaterThan(0)
});

test("addPost should throw error if a Post isn't passed", () => {
    expect(() => {
        testCategory.addPost("")
    }).toThrowError();
});
