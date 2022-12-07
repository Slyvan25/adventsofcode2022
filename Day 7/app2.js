const fs = require("fs")


const readData = () => {

  const setPath = (path, value, obj) => {

    let iter = obj

    for (const folder of path.slice(0, -1)) {

      if (!iter[folder]) {

        iter[folder] = {}

      }

      iter = iter[folder]

    }

    iter[path.slice(-1)[0]] = value

  }


  const data = fs.readFileSync("./input", "utf-8").split(/\r?\n/)


  const treeData = {}

  let i = 0

  let currentPath = []


  while (data[i]) {

    const tokens = data[i].split(" ")


    if (tokens[0] === "$") {

      if (tokens[1] === "cd") {

        if (tokens[2] === "/") {

          currentPath = []

        } else if (tokens[2] === "..") {

          currentPath.pop()

        } else {

          currentPath.push(tokens[2])

        }

      }

    } else if (tokens[0] === "dir") {

      // do nothing

    } else {

      setPath([...currentPath, tokens[1]], Number(tokens[0]), treeData)

    }


    i++

  }


  // uncomment for viewing tree

  // console.log(JSON.stringify(treeData, null, 2))


  return treeData

}


const main = () => {

  const treeData = readData()

  const folderSizes = {}


  const calculateSize = (obj, currentPath = ["."]) => {

    let size = 0


    for (const [key, value] of Object.entries(obj)) {

      size +=

        typeof value === "object"

          ? calculateSize(value, [...currentPath, key])

          : value

    }


    folderSizes[currentPath.join("/")] = size


    return size

  }


  calculateSize(treeData)


  const minimumRequiredSpace = 30000000 - (70000000 - folderSizes["."])


  const res = Object.values(folderSizes)

    .sort((a, b) => a - b)

    .filter(size => size >= minimumRequiredSpace)[0]


  console.log(res)

}


main()