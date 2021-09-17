class Author {
    constructor(name, yearOfBirth) {
        if (name === "") {
            throw Error("Name cannot be empty");
        }
        if (yearOfBirth < 0) {
            throw Error("Year of birth must >= 0");
        }
        if (!Number.isInteger(yearOfBirth)) {
            throw Error("Year of birth must be an integer");
        }
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }
}


module.exports = Author;