let teacher = {
    name: "Walter",
    subject: "Chemistry",
};
console.log(name);
// Will output an error because name hasn't been declared, you would either have to log "teacher.name" or destructure the "teacher" variable

let teacher = {
    name: "Walter",
    subject: "Chemistry",
};
const { name } = teacher;
console.log(name);
//Will output "Walter" because the "teacher" variable has been destructured.

const animals = ["Red Panda", "Otter", "Raccoon"];
const [pet] = animals;
console.log(pet);
//Will output "Red Panda" since there is only one variable when the list is being destructured so it will get the item at the first index and assign it.

function shouldDelete({ admin, verified }) {
    return !admin && !verified;
}

let user = {
    id: 8732429,
    admin: true,
    verified: false,
};

console.log(shouldDelete(user));
//Will return false because the "user" variable that is being passed into the function satisfies at least one of the criteria the function is checking against
//and since it is an "&&" both of the destructured variables have to be false for it to return true.

const [a, b, c] = [3, 1, 4, 1, 5];
console.log(c);
//Will log 4 since when the list is being destructured, the item in the place of "c" is 4.

let a = 6;
let b = 22;

console.log({ a, b });
//Will return an object with the key "a" being equal to 6 and the key "b" being equal to 22.