const fileElf = require('fs');
const readline = require('readline');

let contained = 0;
let uncontained = 0;

// Peeking chores
const line = readline.createInterface({
    input : fileElf.createReadStream('input.txt')
});

line.on('line', function (line) {
    // split the elves for christmaaasss flalalalaaaa lalalallaaa
    const elves = line.split(',');
    const left = elves[0].split('-');
    const right = elves[1].split('-');


    if (+left[0] <= +right[0] && +right[1] <= +left[1] || +right[0] <= +left[0] && +left[1] <= +right[1]) {
        contained++;
    }
    if (+left[0] <= +right[0] && +right[0] <= +left[1] || +right[0] <= +left[0] && +left[0] <= +right[1]) {
        uncontained++;
    }
});

line.on('close', () => {
    console.log(`Tasks containing other tasks: ${contained}\r\ntask that didn't ${uncontained}`);
});