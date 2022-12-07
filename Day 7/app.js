const fileElf = require('fs');
const readline = require('readline');
// Peeking santa's list
// const line = readline.createInterface({
//     input : fileElf.createReadStream('input')
// });

// let currentDirectory = "";
// let currentDirectorySize = 0;

// const directorySizes = [];
// const maxFileSize = 100000;


// line.on('line', function (output) {
//     // only changes directory after reading everything
//     if (output.startsWith("dir")) {
//         // saves previous directory size
//         if (currentDirectory && currentDirectorySize !== 0) {
//             directorySizes.push(currentDirectorySize);
//         }
//         // sets new directory
//         currentDirectory = output.split(" ")[1];
//     }
//     // keeps checking directory contents and filesize
//     if(currentDirectory && !output.startsWith("$") && !output.startsWith("dir"))
//     {
//         let fileSize = +output.split(" ")[0];
//             currentDirectorySize += fileSize;
//     }
// });

// line.on('close', () => {
//     const result = directorySizes.filter(dirSize => dirSize <= maxFileSize);
//     console.log(directorySizes);
// });

class Directory {
    constructor(name) {
        this.name = name;
        this.children = [];
        this.size = 0;
    }
    
    addChild(child) {
        this.children.push(child);
    }
    
    addSize(size) {
        this.size += size;
    }
}

class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}


const inputLines = fileElf.readFileSync("input").toString().split("\n");
// // Create the root directory
const root = new Directory('/');


// Parse the input and create Directory objects for each of the directories and files
let currentDirectory = root;
for (let line of inputLines) {
    // Split the line into tokens
    const tokens = line.split(' ');
    
    // If the line is a command, update the current directory
    if (tokens[0] === 'cd') {
        if (tokens[1] === '/') {
            currentDirectory = root;
        } else if (tokens[1] === '..') {
            currentDirectory = currentDirectory.parent;
        } else {
            currentDirectory = currentDirectory.getChild(tokens[1]);
        }
    }
    
    // If the line is a directory or file, add it as a child of the current directory
    else {
        if (tokens[1] === 'dir') {
            const directory = new Directory(tokens[2]);
            directory.parent = currentDirectory;
            currentDirectory.addChild(directory);
            currentDirectory = directory;
        } else {
            const file = new File(tokens[1], parseInt(tokens[2], 10));
            currentDirectory.addChild(file);
            currentDirectory.addSize(file.size);
        }
    }
    console.log(currentDirectory)
}


// Traverse the tree in a depth-first manner to calculate the total size of each directory
function traverseTree(node) {
    // Traverse the children of the current node
    for (let child of node.children) {
        if (child instanceof Directory) {
            // If the child is a directory, traverse its subtree
            traverseTree(child);
            
            // Add the size of the child directory to the total size of the current directory
            node.addSize(child.size);
        } else {
            // If the child is a file, add its size to the total size of the current directory
            node.addSize(child.size);
        }
    }
}

// Start the traversal from the root node
traverseTree(root);
