function pause(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

async function printWithDelay(arr, delay) { 
    for (let i of arr) {
        console.log(i);
        await pause(delay);
    }
}

printWithDelay([1,2,3,4], 2000)