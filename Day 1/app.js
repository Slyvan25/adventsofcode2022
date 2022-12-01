const fileElf = require('fs');
const readline = require('readline');

//initialize santas non naughty list
let list = [];

// Peeking santa's list
const line = readline.createInterface({
    input : fileElf.createReadStream('input.txt')
});

// split the elves for christmaaasss flalalalaaaa lalalallaaa
let foodiecalculation = 0;

line.on('line', function (text) {
    // checking for new elf
    if(!text) {
        list.push(Number(foodiecalculation));
        foodiecalculation = 0; // HO HO HO!!!
    }
    
    // calculate
    foodiecalculation += Number(text);
});

line.on('close', () => {
    
    // part 1
    const result = Math.max(...list);
    
    //part 2
    let sortedList = list.sort(function(a, b) {
        return b-a
    });
    let top3Calculated = sortedList[0] + sortedList[1] + sortedList[2];
    console.log(`Best elf on the shelf is:${result}\r\ntop 3 elves together are: ${top3Calculated}`);
});