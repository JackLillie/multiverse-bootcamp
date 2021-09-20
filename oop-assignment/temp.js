const Forum = require("./src/Forum");
const User = require("./src/User");

const testForum = new Forum("Jack's Forum");
let user = testForum.addUser("Jack")
let gaming = testForum.addCategory("Gaming");
let newPoll = gaming.addPoll("Test Poll", "Do you like gaming?", ["Yes", "No"], user);
let newComment = newPoll.addComment("Me too!", user);
console.log(newPoll);