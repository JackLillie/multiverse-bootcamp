const Forum = require("./Forum");
const Category = require("./Category");
const Post = require("./Post");
const User = require("./User");

const testForum = new Forum("Forum Name")
const testUser = new User("User Name");
const testPost = new Post("Title", "Body", testUser);
const testCategory = new Category("Test");

test("Test expected input", () => {
    expect(testForum.name).toBe("Forum Name")
});

test("throw error if name is empty", () => {
    expect(() => {
        new Forum("")
    }).toThrowError();
})

test("Test addCategory with expected input", () => {
    testForum.addCategory(testCategory)
    expect(testForum.categories.length).toBeGreaterThan(0);
});

test("Test addUser with expected input", () => {
    testForum.addUser("Test Name")
    expect(testForum.users.length).toBeGreaterThan(0);
});

test("addCategory function throw error if Category not passed", () => {
    expect(() => {
        testForum.addCategory("")
    }).toThrowError();
})

test("addCategory function throw error if name is empty", () => {
    expect(() => {
        testForum.addCategory("")
    }).toThrowError();
})

test("deleteCategory function works", () => {
    testForum.deleteCategory(testCategory)
    expect(testForum).not.toContain(testCategory)
});

test("deleteCategory function throws error when category instance not passed", () => {
    expect(() => {
        testForum.deleteCategory("testCategory")
    }).toThrowError();
});


test("deleteUser function works", () => {
    testForum.deleteUser(testUser)
    expect(testForum).not.toContain(testUser)
});

test("deleteUser function throws error when user instance not passed", () => {
    expect(() => {
        testForum.deleteUser("")
    }).toThrowError();
});
