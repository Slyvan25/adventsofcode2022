const fileElf = require('fs');
const packetCapture = fileElf.readFileSync("input.txt").toString().split("");
const packetSize = 4;

// process packet
const processStream = (length) => (character, i) => {
    const chunk = new Set(packetCapture.slice(i, i + length))
    if (chunk.size === length) return i + length
}

const part1 = packetCapture.map(processStream(packetSize)).filter(Boolean)[0];
const part2 = packetCapture.map(processStream(packetSize + 10)).filter(Boolean)[0];


console.log(`start-of-packet marker is detected at : ${part1}\r\nlarger start-of-message marker packet detected at: ${part2} `);
