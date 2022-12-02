const fileElf = require('fs');
const readline = require('readline');

//#region definitions
let score = 0;
let rematchScore = 0;
const movePoints = {"X": 1, "Y": 2, "Z": 3};
const rematchPoints = {"X": 0, "Y": 3, "Z": 6};
const playerMoves = {
    'A': "rock",
    'B': "paper",
    'C': "scissors",
    'X': "rock",
    'Y': "paper",
    'Z': "scissors"
}
const line = readline.createInterface({
    input : fileElf.createReadStream('input.txt')
});
//#endregion

//#region functions
function calculateScore(elfInput, myInput) {
    switch (elfInput + myInput) {
    // player wins +6
      case "scissorsrock":
      case "paperscissors":
      case "rockpaper":
        return 6;
    // draw +3
      case "paperpaper":
      case "scissorsscissors":
      case "rockrock":
        return 3;

        default:
            return 0;
    }
}

function calculateRematchScore(elfInput, myInput) {
    switch (elfInput + myInput) {
    // player wins +6
      case "scissorsrock":
      case "paperscissors": 
      case "rockpaper": 
        return 3;
    // draw +3
      case "paperpaper":
      case "scissorsscissors":
      case "rockrock":
        return 1;

        default:
            return 2;
    }
}
//#endregion



line.on('line', function (text) {
    const [elf, player] = text.split(' ')
    score += movePoints[player];
    score += calculateScore(playerMoves[elf], playerMoves[player]);

    rematchScore += rematchPoints[player];
    rematchScore += calculateRematchScore(playerMoves[elf], playerMoves[player]);
    console.log(rematchScore)
});

line.on('close', () => {
    // console.log(points)
});
