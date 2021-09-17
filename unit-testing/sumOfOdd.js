function sumOfOdd(arr) {
    let res = 0;
    for (let num of arr) {
        if (num % 2 != 0) {
            res += 1;
        }
    }
    return res
}

module.exports = sumOfOdd;