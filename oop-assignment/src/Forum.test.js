const Forum = require("./Forum");
const Category = require("./Category");

const testForum = new Forum("Forum Name")

test("Test expected input", () => {
    expect(testForum.name).toBe("Forum Name")
});

test("throw error if name is empty", () => {
    expect(() => {
        new Forum("")
    }).toThrowError();
})

test("Test addCategory with expected input", () => {
    testForum.addCategory(new Category("Test"))
    expect(testForum.categories.length).toBeGreaterThan(0);
});

test("Test addUser with expected input", () => {
    testForum.addUser(new User("Test"))
    expect(testForum.users.length).toBeGreaterThan(0);
});

test("addCategory function throw error if Category not passed", () => {
    expect(() => {
        testForum.addCategory("")
    }).toThrowError();
})

test("addUser function throw error if User not passed", () => {
    expect(() => {
        testForum.addUser("")
    }).toThrowError();
})
