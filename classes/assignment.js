const Book = require("./book");
const Author = require("./author");

let roaldDahl = new Author("Roald Dahl", 1916);
let jkRowling = new Author("J.K. Rowling", 1965);

let harryPotter = new Book("Harry Potter and the Philosopher's Stone", jkRowling);
let charlieAndTheChocolateFactory = new Book("Charlie and the Chocolate Factory", roaldDahl);

charlieAndTheChocolateFactory.newEdition()
console.log(charlieAndTheChocolateFactory.latestEdition);
