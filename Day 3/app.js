const readFileSync = require("fs").readFileSync;
let input = readFileSync("input.txt", { encoding: "utf8", flag: "r" }).trim();

const day3Pt1 = input => {
  let totalPriority = 0;
  const sacks = input.split(/\n/);
  let repeatedItem;
  for (let sack of sacks) {
    const middleIdx = sack.length / 2;
    const firstCompartment = sack.slice(0, middleIdx).split(''), secondCompartment = sack.slice(middleIdx).split('');
    repeatedItem = secondCompartment.filter(item => firstCompartment.includes(item))[0];
    const priorityVal = repeatedItem.charCodeAt(0) - (repeatedItem === repeatedItem.toUpperCase() ? 38 : 96);
    totalPriority += priorityVal;
  }
  return totalPriority;
}

const part1 = day3Pt1(input);
console.log(part1)


const day3Pt2 = input => {
  let totalPriority = 0;
  const sacks = input.split(/\n/);
  const groups = sacks.map((elv, idx) => {
    const temp = [elv, sacks[idx + 1], sacks[idx + 2]];
    sacks.splice(idx + 1, 2);
    return temp;
  }).filter(Boolean)
  let repeatedItem;
  for (let group of groups) {
    const [firstElv, secondElv, thirdElv] = group;
    const firstElvItems = firstElv.split('')
    const secondElvItems = secondElv.split('')
    const thirdElvItems = thirdElv.split('')
    repeatedItem = thirdElvItems.filter(item => secondElvItems.includes(item) && firstElvItems.includes(item))[0];
    const priorityVal = repeatedItem.charCodeAt(0) - (repeatedItem === repeatedItem.toUpperCase() ? 38 : 96);
    totalPriority += priorityVal;
  }
  return totalPriority;
}

const part2 = day3Pt2(input);
console.log(part2)