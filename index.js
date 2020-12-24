const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};
const isOdd = (num) => num % 2;
const isDivisibleIn100 = (num) => num % 100;

const generateNewMap = (size = 8) => {
  const map = [];
  for (let i = 0; i < size; i++) {
    map.push([]);
    for (let j = 0; j < size; j++) {
      map[i].push(getRandomArbitrary(0, 100) > 60 ? 1 : 0);
    }
  }
  return map;
};

const printMap = (map) => {
  console.clear();
  map.forEach((row) => {
    console.log(
      row.reduce(
        (accumulated, current) =>
          `${accumulated} ${current ? "\u263A" : "\u02D7"}`,
        ""
      )
    );
  });
};

const countNeighbours = (map, y, x) => {
  const possiblePositions = [
    { y: -1, x: -1 }, // topLeft
    { y: -1, x: 0 }, // topCenter
    { y: -1, x: 1 }, // topRight
    { y: 0, x: -1 }, // middleLeft
    { y: 0, x: 1 }, // middleRight
    { y: 1, x: -1 }, // bottomLeft
    { y: 1, x: 0 }, // bottomCenter
    { y: 1, x: 1 }, // bottomRight
  ];
  let count = 0;
  possiblePositions.forEach((position) => {
    if (
      y + position.y < 0 ||
      x + position.x < 0 ||
      y + position.y >= map.length ||
      x + position.x >= map.lnglength
    ) {
      return;
    } else {
      if (map[y + position.y][x + position.x]) {
        count += 1;
      }
    }
  });
  return count;
};

const gameOfLife = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const countOfNeighbours = countNeighbours(map, i, j);
      if (map[i][j]) {
        // dies as if by underpopulation
        if (countOfNeighbours < 2) {
          map[i][j] = 0;
        }

        // lives on to the next generation
        if (countOfNeighbours === 2 || countOfNeighbours === 3) {
          map[i][j] = 1;
        }

        // dies as if by overpopulation
        if (countOfNeighbours > 3) {
          map[i][j] = 0;
        }
      } else {
        // becomes a live cell as if by reproduction.
        if (countOfNeighbours === 3) {
          map[i][j] = 1;
        }
      }
    }
  }
};

const main = () => {
  let length = 16;
  const indexOfArg = process.argv.indexOf("-l");
  if (indexOfArg !== -1) {
    length = Number(process.argv[indexOfArg + 1]) || length;
  }

  let map = [];

  map = generateNewMap(length);

  setInterval(() => {
    printMap(map);
    gameOfLife(map);
  }, 500);
};

main();
