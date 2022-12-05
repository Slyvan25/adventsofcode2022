// [G]         [P]         [M]    
// [V]     [M] [W] [S]     [Q]    
// [N]     [N] [G] [H]     [T] [F]
// [J]     [W] [V] [Q] [W] [F] [P]
// [C] [H]     [T] [T] [G] [B] [Z] [B]
// [S] [W] [S] [L] [F] [B] [P] [C] [H]
// [G] [M] [Q] [S] [Z] [T] [J] [D] [S]
// [B] [T] [M] [B] [J] [C] [T] [G] [N]
// 1   2   3   4   5   6   7   8   9 

const fileElf = require('fs');
const readline = require('readline');

let cargo = [
    // row 1 (top to bottom)
    ['C','S','G','B'],
    // row 2 (top to bottom)
    ['G','V','N','J','H','W','M','T'],
    // row 3 (top to bottom)
    ['S','Q','M'],
    // row 4
    ['M','N','W','T','L','S','B'],
    // row 5
    ['P','W','G','V','T','F','Z','J'],
    // row 6
    ['S','H','Q','G','B','T','C'],
    // row 7
    ['W','B','P','J','T'],
    // row 8
    ['M','Q','T','F','Z','C','D','G'],
    // row 9
    ['F','P','B','H','S','N']
];

let newCargo = [
    // row 1 (top to bottom)
    ['C','S','G','B'],
    // row 2 (top to bottom)
    ['G','V','N','J','H','W','M','T'],
    // row 3 (top to bottom)
    ['S','Q','M'],
    // row 4
    ['M','N','W','T','L','S','B'],
    // row 5
    ['P','W','G','V','T','F','Z','J'],
    // row 6
    ['S','H','Q','G','B','T','C'],
    // row 7
    ['W','B','P','J','T'],
    // row 8
    ['M','Q','T','F','Z','C','D','G'],
    // row 9
    ['F','P','B','H','S','N']
];
// Peeking chores
const line = readline.createInterface({
    input : fileElf.createReadStream('input.txt')
});

line.on('line', function (line) {
    if (!line.startsWith('[') || !line.startsWith(' ')) {
        
        // export instructions/commands
        const commandParameters = line.match(/\d+/gm);
        const moveAmount = commandParameters[0];
        // converted the parameters to something iteratable in cargo
        const from = commandParameters[1] - 1;
        const to = commandParameters[2] -1;
        
        // i like to? MOVE IT!!
        const pickedUpCargo = cargo[from].splice(0, moveAmount);
        
        for (let crate = 0; crate < pickedUpCargo.length; crate++) {
            cargo[to].unshift(pickedUpCargo[crate]);
        }

        // crateMover9001
        for (const move of moveAmount) {
            const crates = newCargo[from].splice(-move, move);
            newCargo[to] = newCargo[to].concat(crates);
        }


        console.clear()
        console.log(`moving ${moveAmount} crates from: ${from} to: ${to}`);
    }
});

line.on('close', () => {
    let crateMover9000 = ""; 
    let crateMover9001 = ""; 
    for (let stack = 0; stack < cargo.length; stack++) {
        const topCrate = cargo[stack][0] ? cargo[stack][0] : '';
        crateMover9000 += topCrate;
    }
    for (let stack = 0; stack < newCargo.length; stack++) {
        const topCrate = newCargo[stack][0] ? newCargo[stack][0] : '';
        crateMover9001 += topCrate;
    }
    console.log(crateMover9000);
    console.log(crateMover9001);
});