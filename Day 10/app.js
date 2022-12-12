const fileElf = require('fs');
const readline = require('readline');



// Peeking beep boop program instructions
const line = readline.createInterface({
    // input : fileElf.createReadStream('example.txt')
    input : fileElf.createReadStream('input')
});


line.on('line', function (text) {
    getPart1(text);
    getPart2(text);
});

line.on('close', () => {
    console.log(total)

    let image = chunks(screen, columns).map(row => row.join('')).join('\n');
    console.log(image);
});


// part 1 variables
let x = 1;
let cycle = 1;
let total = 0;

function getPart1(text) {
    const [operation, num] = text.split(" ")
    
    if(cycle % 40 == 20) {
        total += cycle * x;
    }
    cycle += 1;
    
    if(operation === "addx") {
        if (cycle % 40 == 20) {
            total += cycle * x;
        }
        x += +num;
        cycle += 1;
    }
}

// part 2
const columns = 40;
const rows = 6;
const spriteWidth = 3;

let screen = [' ', columns * rows];
let cycle2 = 1;
let x2 = 1;

function getPart2 (text) {
    const [operation, num] = text.split(" ")
    screen[cycle2 - 1] = getPixel(cycle2, x2)
    cycle2 += 1;

    if(operation === "addx") {
        screen[cycle2 - 1] = getPixel(cycle2, x2)
        cycle2 += 1;    
        x2 += +num;
    }
}


function getPixel(cycle, xNumber) {
    const currentColumn = (cycle -1) % columns;
    if (Math.abs(currentColumn - xNumber) <= spriteWidth /  2) {
        return '█';
    } else {
        return ' ';
    }
}


function chunks(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }