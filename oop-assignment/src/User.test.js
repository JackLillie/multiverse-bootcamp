const User = require("./User");
const Post = require("./Post");

const testUser = new User("User Name");

test("Test expected input", () => {
    expect(testUser.name).toBe("User Name")
});

test("throw error if name is empty", () => {
    expect(() => {
        new User("")
    }).toThrowError();
})

test("throw error if name starts with a number", () => {
    expect(() => {
        new User("1Jack")
    }).toThrowError();
})

test("Test changeName with expected input", () => {
    testUser.changeName("New Name")
    expect(testUser.name).toBe("New Name");
});

test("Test addPost with expected input", () => {
    testUser.addPost(new Post("Title", "Body", testUser))
    expect(testUser.posts.length).toBeGreaterThan(0);
});

test("changeName throws error if new name is empty", () => {
    expect(() => {
        testUser.changeName("")
    }).toThrowError();
});

test("changeName throws error if new name starts with a number", () => {
    expect(() => {
        testUser.changeName("1Jack")
    }).toThrowError();
});

test("addPost throws error if Post is not passed", () => {
    expect(() => {
        testUser.addPost("")
    }).toThrowError();
});