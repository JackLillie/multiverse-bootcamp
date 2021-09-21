async function timesBy5(num) {
    return num * 5;
}

console.log(timesBy5(10));
// Will return a promise since all async functions return promises whether there is an await inside or not.
// Correct