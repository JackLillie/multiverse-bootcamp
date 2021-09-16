class Person {
    constructor (name, parents) {
        this.name = name,
        this.parents = parents
    }
    printParents() {
        for (let i = 0; i < this.parents.length; i++) {
            if (this.parents[i].name === null) {
                console.log("N/A")
            } else {
                console.log(this.parents[i].name);
            }
        }
    }
}

let abraham = new Person("Abraham", [null, null]);

let mona = new Person("Mona", [null, null]);

let clancy = new Person("Clancy", [null, null]);

let jackie = new Person("Jackie", [null, null]);

let herb = new Person("Herb", [abraham, mona]);

let homer = new Person("Homer", [abraham, mona]);

let marge = new Person("Marge", [clancy, jackie]);

let patty = new Person("Patty", [clancy, jackie]);

let selma = new Person("Selma", [clancy, jackie]);

let ling = new Person("Ling", [null, selma]);

let bart = new Person("Bart", [homer, marge]);

let lisa = new Person("Lisa", [homer, marge]);

let maggie = new Person("Maggie", [homer, marge]);


console.log(maggie.name);

console.log(maggie.parents);

maggie.printParents();