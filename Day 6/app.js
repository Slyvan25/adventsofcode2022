const fileElf = require('fs');
const packetCapture = fileElf.readFileSync("input.txt").toString().split("");
const packetSize = 4;

// process packet
const processStream = (length) => (character, i) => {
    const chunk = new Set(packetCapture.slice(i, i + length))
    if (chunk.size === length) return i + length
}

const protocolMarker = packetCapture.map(processStream(packetSize)).filter(Boolean)[0];
const messages = packetCapture.map(processStream(packetSize + 10)).filter(Boolean)[0];


console.log(`start-of-packet protocol marker is detected at : ${protocolMarker}\r\nmessage packet marker detected at: ${messages} `);
