const Forum = require("./src/Forum");
const User = require("./src/User");

const testForum = new Forum("Jack's Forum");
let user = testForum.addUser("Jack")
let gaming = testForum.addCategory("Gaming");
let newPost = gaming.addPost("I play Valorant", "Valorant is my favourite game", user)
let newComment = newPost.addComment("Me too!", user);

console.log(JSON.stringify(testForum));