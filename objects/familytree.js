function createFamilyMember(name, parents) {
    return {
        name,
        parents,
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
};

let abraham = createFamilyMember("Abraham", [null, null]);

let mona = createFamilyMember("Mona", [null, null]);

let clancy = createFamilyMember("Clancy", [null, null]);

let jackie = createFamilyMember("Jackie", [null, null]);

let herb = createFamilyMember("Herb", [abraham, mona]);

let homer = createFamilyMember("Homer", [abraham, mona]);

let marge = createFamilyMember("Marge", [clancy, jackie]);

let patty = createFamilyMember("Patty", [clancy, jackie]);

let selma = createFamilyMember("Selma", [clancy, jackie]);

let ling = createFamilyMember("Ling", [null, selma]);

let bart = createFamilyMember("Bart", [homer, marge]);

let lisa = createFamilyMember("Lisa", [homer, marge]);

let maggie = createFamilyMember("Maggie", [homer, marge]);


console.log(maggie.name);

console.log(maggie.parents);

maggie.printParents();